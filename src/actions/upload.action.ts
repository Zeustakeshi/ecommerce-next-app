"use server";
import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import db from "@/lib/db";
import { nanoid } from "@/lib/utils";
import { UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";

type UploaderParams = {
    userId: string;
    deleteExistedImageHandler: () => Promise<void>;
    saveImageHandler: (images: UploadApiResponse[]) => Promise<void>;
    images: File[];
    folder: string;
};

const imageUploader = async ({
    userId,
    deleteExistedImageHandler,
    saveImageHandler,
    images,
    folder,
}: UploaderParams) => {
    await deleteExistedImageHandler();
    const uploadMultiImagePromises = images.map(async (image) => {
        const arrayBuffer = await image.arrayBuffer();
        const imageBase64 = Buffer.from(arrayBuffer).toString("base64");

        const responseData = await cloudinary.uploader.upload(
            `data:${image.type};base64,${imageBase64}`,
            {
                resource_type: "image",
                public_id: `${userId}-${nanoid(20)}`,
                folder: folder,
            }
        );
        return responseData;
    });
    const uploadReponses = await Promise.all(uploadMultiImagePromises);
    await saveImageHandler(uploadReponses);
};

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
        await imageUploader({
            folder: `tdmu-eStore/shop/${session.user.id}/banner`,
            images: images,
            userId: session.user.id,
            deleteExistedImageHandler: async () => {
                const extistedImages = await db.shopImage.findMany({
                    where: { shopProfileId: session.user.id },
                });

                // delete exist resource before upload
                await db.shopImage.deleteMany({
                    where: {
                        shopProfileId: session.user.id,
                    },
                });

                const promiseDeleteImages = extistedImages.map(
                    async (image) => {
                        await cloudinary.uploader.destroy(image.cloudPublicId);
                    }
                );

                await Promise.all(promiseDeleteImages);
            },
            saveImageHandler: async (images: UploadApiResponse[]) => {
                const saveMultiImageToDatabsePropmises = images.map(
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
            },
        });

        revalidatePath("/manager/shop/customize");
        return { success: "upload success!" };
    } catch (error: any) {
        return { error: error.message };
    }
};

export const uploadProductImageAction = async (formData: FormData) => {
    const session = await auth();
    if (
        !session?.user.id ||
        !session?.user?.shop ||
        !session.user.roles.includes("SHOP")
    )
        return { error: "Permission denied !" };
    const images = formData.getAll("images") as File[];

    const payload = formData.get("payload") as string;
    let productId: any = undefined;
    if (payload) {
        productId = JSON.parse(payload).productId;
    }
    if (!productId) return { error: "ProductId not found" };
    try {
        const product = await db.product.findUnique({
            where: {
                id: productId,
            },
        });
        if (!product) return { error: "Invalid productId" };

        await imageUploader({
            folder: `tdmu-eStore/products/${productId}`,
            images: images,
            userId: session.user.id,
            deleteExistedImageHandler: async () => {
                const extistedImages = await db.productImage.findMany({
                    where: { productId: productId },
                });
                // delete exist resource before upload
                await db.productImage.deleteMany({
                    where: {
                        productId: productId,
                    },
                });
                const promiseDeleteImages = extistedImages.map(
                    async (image) => {
                        await cloudinary.uploader.destroy(image.cloudPublicId);
                    }
                );
                await Promise.all(promiseDeleteImages);
            },
            saveImageHandler: async (images: UploadApiResponse[]) => {
                const saveMultiImageToDatabsePropmises = images.map(
                    async (data) => {
                        await db.productImage.create({
                            data: {
                                cloudPublicId: data.public_id,
                                format: data.format,
                                productId: productId,
                                imageUrl: data.secure_url,
                            },
                        });
                    }
                );
                await Promise.all(saveMultiImageToDatabsePropmises);
            },
        });
        revalidatePath("/manager/shop/products/new");
        return { success: "upload success!" };
    } catch (error: any) {
        return { error: error.message };
    }
};
