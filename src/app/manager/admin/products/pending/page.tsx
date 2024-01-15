import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "../columns";
import db from "@/lib/db";
import { ProductStatus } from "@prisma/client";

const page = async () => {
    const products = await db.product.findMany({
        where: { status: ProductStatus.PENDING },
        include: {
            detail: true,
            shop: true,
        },
    });

    return (
        <div>
            <h1 className="text-xl text-muted-foreground font-semibold my-5">
                Sản phẩm đang chờ duyệt
            </h1>
            <DataTable
                filterPlaceholder="Tên sản phẩm"
                filterColums="name"
                canFilter
                columns={columns}
                data={products.map((product) => ({
                    name: product.name!,
                    category: product.categoryName!,
                    description: product.description!,
                    id: product.id!,
                    price: parseInt(product.detail?.price as any),
                    shopName: product.shop.name!,
                    status: product.status,
                }))}
            />
        </div>
    );
};

export default page;
