import { auth } from "@/auth";
import ProductDetailForm from "@/components/forms/product/DetailForm";
import db from "@/lib/db";
import { findProductById } from "@/lib/productUtils";
import { redirect } from "next/navigation";
import React from "react";

const ProductMoreInfo = async ({ params }: { params: any }) => {
    const session = await auth();

    if (!session?.user.id) redirect("/login");

    const productId = params.id as string;
    let product = await findProductById(productId, {
        shopId: true,
        id: true,
        detail: {
            select: {
                moreDescription: true,
                brand: true,
                isNew: true,
                origin: true,
            },
        },
    });

    if (!product || product.shopId !== session.user.id) {
        redirect("/manager/shop/products");
    }

    return (
        <div>
            <h2 className="text-lg font-semibold text-muted-foreground">
                2. Thông tin chi tiết
            </h2>
            <div className="mt-5 p-5">
                <ProductDetailForm
                    defaultValues={{
                        brand: product.detail?.brand || undefined,
                        isNew: product.detail?.isNew || undefined,
                        moreDescription:
                            product.detail?.moreDescription || undefined,
                        origin: product.detail?.origin || undefined,
                    }}
                    productId={product.id}
                />
            </div>
        </div>
    );
};

export default ProductMoreInfo;
