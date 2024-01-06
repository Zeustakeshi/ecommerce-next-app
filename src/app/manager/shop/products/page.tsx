import { Button } from "@/components/ui/button";
import React from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { nanoid } from "@/lib/utils";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            inventory: 200,
            price: 2000,
            productId: nanoid(),
            productName: "Trái cam màu đỏ",
            sold: 300,
        },
        {
            inventory: 200,
            price: 2000,
            productId: nanoid(),
            productName: "Táo",
            sold: 500,
        },
        {
            inventory: 200,
            price: 2000,
            productId: nanoid(),
            productName: "Chuối",
            sold: 900,
        },
        {
            inventory: 200,
            price: 2000,
            productId: nanoid(),
            productName: "Ổi",
            sold: 300,
        },
        // ...
    ];
}

const ShopProduct = async () => {
    const data = await getData();
    return (
        <div className="w-full h-full space-y-5">
            <h1 className="text-2xl font-semibold text-muted-foreground">
                Quản lý sản phẩm của bạn
            </h1>
            <div className="w-full flex justify-end items-center">
                <Button>Thêm sản phẩm</Button>
            </div>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

export default ShopProduct;
