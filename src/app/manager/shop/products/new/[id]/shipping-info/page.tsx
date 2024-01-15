import { auth } from "@/auth";
import ShippingForm from "@/components/forms/product/ShippingForm";
import db from "@/lib/db";
import { findProductById } from "@/lib/productUtils";
import { redirect } from "next/navigation";
import React from "react";

const ProductShipInfo = async ({ params }: { params: any }) => {
    const session = await auth();
    if (!session?.user.id) redirect("/login");

    const productId = params.id as string;

    const product = await db.product.findUnique({
        where: {
            id: productId,
        },
        select: {
            id: true,
            shopId: true,
            shipMethods: {
                include: {
                    shipMethod: true,
                },
            },
            detail: {
                select: {
                    long: true,
                    height: true,
                    weightAfterPackaging: true,
                    width: true,
                },
            },
        },
    });

    if (!product || product.shopId !== session.user.id) {
        redirect("/manager/shop/products");
    }

    const productDetail = product.detail;
    const defaultValues = {
        dimensions: {
            height: parseFloat(productDetail?.height as any),
            long: parseFloat(product.detail?.long as any),
            width: parseFloat(product.detail?.width as any),
        },
        weightAfterPackaging: parseFloat(
            productDetail?.weightAfterPackaging as any
        ),
        ship: product.shipMethods.map((shipMethod) => ({
            code: shipMethod.shipCode,
            shipCost: shipMethod.cost,
        })),
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-muted-foreground">
                4. Thông tin vận chuyển
            </h2>
            <div className="mt-5 p-5">
                <ShippingForm
                    productId={product.id}
                    defaultValues={defaultValues}
                />
            </div>
        </div>
    );
};

export default ProductShipInfo;
