import { DefaultArgs } from "@prisma/client/runtime/library";
import db from "./db";
import { Prisma, Product, ProductDetail } from "@prisma/client";

export const findProductById = async (
    productId: string,
    select: Prisma.ProductSelect<DefaultArgs>
) => {
    return await db.product.findUnique({
        where: {
            id: productId,
        },
        select: {
            shopId: true,
            id: true,

            ...select,
        },
    });
};

export const updateProduct = async (
    shopId: string,
    productId: string,
    data:
        | (Prisma.Without<
              Prisma.ProductUpdateInput,
              Prisma.ProductUncheckedUpdateInput
          > &
              Prisma.ProductUncheckedUpdateInput)
        | (Prisma.Without<
              Prisma.ProductUncheckedUpdateInput,
              Prisma.ProductUpdateInput
          > &
              Prisma.ProductUpdateInput)
) => {
    const product = await db.product.findUnique({
        where: {
            id: productId,
            shopId: shopId,
        },
        select: {
            shopId: true,
        },
    });

    if (!product || product.shopId !== shopId)
        throw new Error("Can't update product::: invalid productId or shopId");

    return await db.product.update({
        where: {
            shopId: shopId,
            id: productId,
        },
        data: data,
    });
};
