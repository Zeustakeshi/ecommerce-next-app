import { auth } from "@/auth";
import BasicForm from "@/components/forms/product/BasicForm";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const getProduct = async (productId: string) => {
    return await db.product.findUnique({
        where: {
            id: productId || "",
        },
        select: {
            id: true,
            categoryName: true,
            description: true,
            images: {
                select: {
                    imageUrl: true,
                },
            },
            name: true,
        },
    });
};

const createNewProduct = async (shopId: string) => {
    return await db.product.create({
        data: {
            shopId: shopId,
            isPublic: false,
            detail: { create: {} },
        },
        select: {
            id: true,
            categoryName: true,
            description: true,
            images: {
                select: {
                    imageUrl: true,
                },
            },
            name: true,
        },
    });
};

const ProductBasicInfo = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const session = await auth();

    if (!session?.user.id) redirect("/login");

    const productId = searchParams.id as string;
    let product = await getProduct(productId);

    if (!product) {
        product = await createNewProduct(session.user.id);
    }

    return (
        <div>
            <h2 className="text-lg font-semibold text-muted-foreground">
                1. Thông tin cơ bản
            </h2>
            <div className="mt-5 p-5">
                <BasicForm
                    defaultValues={{
                        id: product.id,
                        category: product?.categoryName || undefined,
                        name: product?.name || undefined,
                        images: product?.images?.map((image) => image.imageUrl),
                        description: product.description || undefined,
                    }}
                ></BasicForm>
            </div>
        </div>
    );
};

export default ProductBasicInfo;
