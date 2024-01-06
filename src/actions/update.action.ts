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

export const uploadShopBannerAction = async (formData: FormData) => {
    const session = await auth();
    if (
        !session?.user.id ||
        !session?.user?.shop ||
        !session.user.roles.includes("SHOP")
    )
        return { error: "Permission denied !" };
    const images = formData.getAll("images") as File[];

    try {
        const extistedImages = await db.shopImage.findMany({
            where: { shopProfileId: session.user.id },
        });

        // delete exist resource before upload
        await db.shopImage.deleteMany({
            where: {
                shopProfileId: session.user.id,
            },
        });

        const promiseDeleteImages = extistedImages.map(async (image) => {
            await cloudinary.uploader.destroy(image.cloudPublicId);
        });

        Promise.all(promiseDeleteImages);

        // upload resource

        const uploadMultiImagePromises = images.map(async (image) => {
            const arrayBuffer = await image.arrayBuffer();
            const imageBase64 = Buffer.from(arrayBuffer).toString("base64");

            const responseData = await cloudinary.uploader.upload(
                `data:${image.type};base64,${imageBase64}`,
                {
                    resource_type: "image",
                    public_id: `${session.user.id}-${nanoid(20)}`,
                    folder: `tdmu-eStore/shop/${session.user.id}/banner`,
                }
            );
            return responseData;
        });
        const uploadReponses = await Promise.all(uploadMultiImagePromises);

        const saveMultiImageToDatabsePropmises = uploadReponses.map(
            async (data) => {
                await db.shopImage.create({
                    data: {
                        cloudPublicId: data.public_id,
                        format: data.format,
                        imageUrl: data.secure_url,
                        shopProfileId: session.user.id,
                    },
                });
            }
        );
        await Promise.all(saveMultiImageToDatabsePropmises);
        revalidatePath("/manager/shop/customize");
        return { success: "upload success!" };
    } catch (error: any) {
        return { error: error.message };
    }
};

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
