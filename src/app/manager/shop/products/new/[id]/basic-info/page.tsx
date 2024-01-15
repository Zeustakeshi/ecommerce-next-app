import { auth } from "@/auth";
import BasicForm from "@/components/forms/product/BasicForm";
import db from "@/lib/db";
import { findProductById } from "@/lib/productUtils";
import { redirect } from "next/navigation";
import React from "react";

const ProductBasicInfo = async ({
    params,
}: {
    params: any;
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const session = await auth();

    if (!session?.user.id) redirect("/login");

    const productId = params.id as string;

    let product = await findProductById(productId, {
        shopId: true,
        id: true,
        categoryName: true,
        description: true,
        images: {
            select: {
                imageUrl: true,
            },
        },
        name: true,
    });

    if (!product || product.shopId !== session.user.id) {
        redirect("/manager/shop/products");
    }

    return (
        <div>
            <h2 className="text-lg font-semibold text-muted-foreground">
                1. Thông tin cơ bản
            </h2>
            <div className="mt-5 p-5">
                <BasicForm
                    productId={product.id}
                    defaultValues={{
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
