"use server";

import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import db from "@/lib/db";
import { nanoid } from "@/lib/utils";
import {
    UpdateShopDescription,
    UpdateShopNameSchema,
} from "@/schemas/update.schema";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const updateShopNameAction = async (
    value: z.infer<typeof UpdateShopNameSchema>
) => {
    const session = await auth();

    if (
        !session?.user ||
        !session?.user.id ||
        !session?.user.shop ||
        !session.user.roles.includes("SHOP")
    ) {
        return { error: "Bạn không có quyện thực hiện hành động này!" };
    }

    const validateName = UpdateShopNameSchema.safeParse(value);
    if (!validateName.success) return { error: "Tên cửa hàng không hợp lệ" };

    try {
        await db.shop.update({
            where: { id: session.user.id },
            data: {
                name: validateName.data.name,
            },
        });
        revalidatePath("/manager/shop/customize");
        return {
            success: "Cập nhật thành công",
        };
    } catch (error) {
        return { error: "Đã có lỗi xảy ra vui lòng thử lại sau" };
    }
};

export const updateShopDescriptionAction = async (
    value: z.infer<typeof UpdateShopDescription>
) => {
    const session = await auth();

    if (
        !session?.user ||
        !session?.user.id ||
        !session?.user.shop ||
        !session.user.roles.includes("SHOP")
    ) {
        return { error: "Bạn không có quyện thực hiện hành động này!" };
    }

    const validateDescription = UpdateShopDescription.safeParse(value);
    if (!validateDescription.success)
        return { error: "Mô tả cửa hàng không hợp lệ" };

    try {
        await db.shopProfile.update({
            where: { shopId: session.user.id },
            data: {
                description: validateDescription.data.description,
            },
        });
        revalidatePath("/manager/shop/customize");
        return {
            success: "Cập nhật thành công",
        };
    } catch (error) {
        return { error: "Đã có lỗi xảy ra vui lòng thử lại sau" };
    }
};
