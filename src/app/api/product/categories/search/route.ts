import db from "@/lib/db";
import redis from "@/lib/redis";
import removeVietnameseTones from "@/lib/removeVietnameseTones";
import { nanoid } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const generateSelectOptions = (depth: number): any => {
    if (depth <= 0) {
        return { name: true };
    }

    return {
        name: true,
        subCategories: {
            select: generateSelectOptions(depth - 1),
        },
    };
};
const getCategoryFromDb = async (keyword: string, depth: number) => {
    const redisKey = `category-search-${keyword}-${depth}`;
    const cacheData = await redis.lrange(redisKey, 0, -1);

    if (cacheData && cacheData.length > 0) {
        return cacheData.map((data) => JSON.parse(data));
    }

    const categories = await db.category.findMany({
        where: {
            keyword: {
                contains: keyword,
                mode: "insensitive",
            },
        },
        select: generateSelectOptions(depth),
    });
    if (categories.length > 0) {
        await redis.rpush(
            redisKey,
            ...categories.map((category) => JSON.stringify(category))
        );

        await redis.expire(redisKey, 15 * 60); // 15 minutes
    }
    return categories;
};

export const GET = async (req: NextRequest) => {
    const { nextUrl } = req;

    let keyword = nextUrl.searchParams.get("k");
    let depth = Math.abs(parseInt(nextUrl.searchParams.get("d") || "1"));
    if (!keyword) return NextResponse.json("Missing keyword");

    keyword = removeVietnameseTones(keyword).toLowerCase();

    try {
        const categories = await getCategoryFromDb(keyword, depth);

        if (categories.length === 0) {
            const response = await fetch(
                `https://banhang.shopee.vn/help/api/v3/global_category/list/?page=1&size=50&keyword=${keyword}`,
                {
                    cache: "no-store",
                }
            );

            const json = await response.json();
            const data = json.data.global_cats as any[];

            const createMutilpleCategoryPromises = data.map(
                async (category: { path: any[] }) => {
                    let parent: string | null = null;
                    const categories = [];
                    for (const path of category.path) {
                        const newCategory = await db.category.upsert({
                            create: {
                                categoryId: nanoid(),
                                name: path.category_name,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                keyword: removeVietnameseTones(
                                    path.category_name
                                ).toLowerCase(),
                                parentName: parent,
                            },
                            update: {
                                updatedAt: new Date(),
                            },
                            where: {
                                name: path.category_name,
                            },
                        });
                        parent = path.category_name;
                        categories.push(newCategory);
                    }
                }
            );
            await Promise.all(createMutilpleCategoryPromises);
            const categories = await getCategoryFromDb(keyword, depth);
            return NextResponse.json(categories);
        }

        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(error, {
            status: 500,
        });
    }
};
