"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { updateProduct } from "@/lib/productUtils";
import {
    ProductBasicInfoSchema,
    ProductDetailSchema,
    ProductSalesInfoSchema,
} from "@/schemas/product.schema";
import { redirect } from "next/navigation";
import * as z from "zod";

export const saveBasicInfoAction = async (
    data: z.infer<typeof ProductBasicInfoSchema>
) => {
    const session = await auth();

    if (
        !session?.user ||
        !session.user.id ||
        !session.user.roles.includes("SHOP")
    ) {
        redirect("/login");
    }

    const productIndfoValidate = ProductBasicInfoSchema.safeParse(data);

    if (!productIndfoValidate.success) {
        return { error: "Thông tin sản phẩm không hợp lệ" };
    }

    const { category, description, name } = productIndfoValidate.data;

    try {
        const product = await db.product.findUnique({
            where: { id: data.id },
            select: {
                images: true,
            },
        });

        if (!product) return { error: "Mã sản phẩm không hợp lệ!" };

        if (product.images.length < 3) {
            return { error: "Sản phẩm phải có ít nhất 3 ảnh" };
        }

        await updateProduct(session.user.id, data.id, {
            categoryName: category,
            name: name,
            description: description,
        });

        return { success: "Lưu thông tin thành công" };
    } catch (error: any) {
        console.log({ error });
        return { error: `Đã có lỗi xảy ra vui lòng thử lại sau` };
    }
};

export const saveProductDetailAction = async (
    data: z.infer<typeof ProductDetailSchema>,
    productId: string
) => {
    const session = await auth();
    if (
        !session?.user ||
        !session.user.id ||
        !session.user.roles.includes("SHOP")
    ) {
        redirect("/login");
    }

    const validatedField = ProductDetailSchema.safeParse(data);

    if (!validatedField.success) return { error: "Thông tin không hợp lệ!" };

    const { moreDescription, brand, isNew, origin } = validatedField.data;

    try {
        await updateProduct(session.user.id, productId, {
            detail: {
                update: {
                    moreDescription,
                    brand,
                    isNew,
                    origin,
                },
            },
        });

        return { success: "Cập nhật thành công" };
    } catch (error) {
        return { error: "Đã có lỗi xảy ra!" };
    }
};

export const saveProductSalesInfoAction = async (
    data: z.infer<typeof ProductSalesInfoSchema>,
    productId: string
) => {
    const session = await auth();
    if (
        !session?.user ||
        !session.user.id ||
        !session.user.roles.includes("SHOP")
    ) {
        redirect("/login");
    }

    const validatedField = ProductSalesInfoSchema.safeParse(data);

    if (!validatedField.success) return { error: "Thông tin không hợp lệ!" };

    const { inventory, price } = validatedField.data;

    try {
        await updateProduct(session.user.id, productId, {
            detail: {
                update: {
                    inventory,
                    price,
                },
            },
        });
        return { success: "Cập nhật thành công" };
    } catch (error) {
        return { error: "Đã có lỗi xảy ra!" };
    }
};

export const createDraftProductAction = async () => {
    const session = await auth();
    if (
        !session?.user ||
        !session?.user.id ||
        !session.user.roles.includes("SHOP")
    ) {
        redirect("/login");
    }

    const product = await db.product.create({
        data: {
            shopId: session.user.id,
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
            shopId: true,
            name: true,
        },
    });

    redirect(`/manager/shop/products/new/${product.id}/basic-info`);
};
