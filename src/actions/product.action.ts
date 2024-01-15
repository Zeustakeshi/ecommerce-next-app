"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { mailSender } from "@/lib/mail";
import { updateProduct } from "@/lib/productUtils";
import {
    ProductBasicInfoSchema,
    ProductDetailSchema,
    ProductSalesInfoSchema,
    ProductSchema,
    ProductShipInfoSchema,
} from "@/schemas/product.schema";
import { ProductStatus, ShipMethodCode } from "@prisma/client";
import { redirect } from "next/navigation";
import * as z from "zod";
import { render } from "@react-email/render";
import ProductRegisterRequest from "@/email-templates/ProductRegisterRequest";

export const saveBasicInfoAction = async (
    data: z.infer<typeof ProductBasicInfoSchema>,
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

    const productIndfoValidate = ProductBasicInfoSchema.safeParse(data);

    if (!productIndfoValidate.success) {
        return { error: "Thông tin sản phẩm không hợp lệ" };
    }

    const { category, description, name } = productIndfoValidate.data;

    try {
        const product = await db.product.findUnique({
            where: { id: productId },
            select: {
                images: true,
            },
        });

        if (!product) return { error: "Mã sản phẩm không hợp lệ!" };

        if (product.images.length < 3) {
            return { error: "Sản phẩm phải có ít nhất 3 ảnh" };
        }

        await updateProduct(session.user.id, productId, {
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

        return { success: "Lưu thành công" };
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
        return { success: "Lưu thành công" };
    } catch (error) {
        return { error: "Đã có lỗi xảy ra!" };
    }
};

export const saveProductShipInfoAction = async (
    data: z.infer<typeof ProductShipInfoSchema>,
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

    const validatedField = ProductShipInfoSchema.safeParse(data);

    if (!validatedField.success) return { error: "Thông tin không hợp lệ!" };

    const {
        dimensions,
        ship: newShipMethods,
        weightAfterPackaging,
    } = validatedField.data;

    try {
        await updateProduct(session.user.id, productId, {
            detail: {
                update: {
                    height: dimensions.height,
                    width: dimensions.width,
                    long: dimensions.long,
                    weightAfterPackaging: weightAfterPackaging,
                },
            },
        });

        const existingShipMethods = await db.productShipMethod.findMany({
            where: { productId: productId },
        });

        const shipMethodsToDelete = existingShipMethods.filter(
            (existingMethod) =>
                !newShipMethods.some(
                    (newMethod) => newMethod.code === existingMethod.shipCode
                )
        );

        await db.$transaction([
            db.productShipMethod.deleteMany({
                where: {
                    shipCode: {
                        in: shipMethodsToDelete.map(
                            (shipMethod) => shipMethod.shipCode
                        ),
                    },
                },
            }),
            ...newShipMethods.map((shipMethod) =>
                db.productShipMethod.upsert({
                    where: {
                        productId_shipCode: {
                            productId: productId,
                            shipCode: shipMethod.code as ShipMethodCode,
                        },
                    },
                    update: {
                        cost: shipMethod.shipCost,
                    },
                    create: {
                        productId: productId,
                        shipCode: shipMethod.code as ShipMethodCode,
                        cost: shipMethod.shipCost,
                    },
                })
            ),
        ]);
        return { success: "Lưu thành công" };
    } catch (error: any) {
        return { error: error.message };
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

export const completeCreateProductAction = async (productId: string) => {
    const session = await auth();
    if (
        !session?.user ||
        !session?.user.id ||
        !session.user.email ||
        !session.user.roles.includes("SHOP")
    ) {
        redirect("/login");
    }

    try {
        const product = await db.product.findUnique({
            where: { id: productId },
            include: {
                detail: true,
                images: true,
                shipMethods: true,
                shop: {
                    select: { id: true },
                },
            },
        });

        if (!product) redirect("/manager/shop/products");

        const productFinal = {
            basicInfo: {
                name: product.name,
                category: product.categoryName,
                description: product.description,
            },
            moreInfo: {
                moreDescription: product.detail?.moreDescription,
                brand: product.detail?.brand || undefined,
                isNew: product.detail?.isNew,
                origin: product.detail?.origin || undefined,
            },
            salesInfo: {
                inventory: product.detail?.inventory,
                price: product.detail?.price,
            },
            shipInfo: {
                dimensions: {
                    height: parseFloat(product.detail?.height as any),
                    width: parseFloat(product.detail?.width as any),
                    long: parseFloat(product.detail?.long as any),
                },
                weightAfterPackaging: parseFloat(
                    product.detail?.weightAfterPackaging as any
                ),
                ship: product.shipMethods.map((shipMethod) => ({
                    code: shipMethod.shipCode as string,
                    shipCost: shipMethod.cost,
                })),
            },
        } as z.infer<typeof ProductSchema>;

        const validatedProduct = ProductSchema.safeParse(productFinal);

        if (!validatedProduct.success) {
            console.log(validatedProduct.error.flatten());

            return {
                error: "Thông tin sản phẩm không hợp lệ vui lòng quay lại và kiểm tra sản phẩm một lần nữa",
            };
        }

        await db.product.update({
            where: { id: productId },
            data: {
                status: ProductStatus.PENDING,
            },
        });

        const emailHtml = render(
            ProductRegisterRequest({
                product: {
                    description: product.description!,
                    images: product.images.map((image) => image.imageUrl),
                    name: product.name!,
                },
                shop: {
                    email: session.user.email,
                    name: session.user.shop?.name!,
                },
            })
        );

        await mailSender({
            from: process.env.MAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: "Yêu cầu Đăng Ký Sản Phẩm",
            html: emailHtml,
        });

        return {
            success:
                "Sản phẩm của đang được xét duyệt, chúng tôi sẽ kiểm tra sản phẩm lại một lần nữa và gửi thông báo cho bạn trong thời gian sớm nhất!",
        };
    } catch (error) {
        return { error: "Đã xảy ra lỗi vui lòng thử lại sao" };
    }
};
