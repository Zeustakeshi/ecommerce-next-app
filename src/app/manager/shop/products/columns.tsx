"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type Payment = {
    productId: string;
    productName: string;
    price: number;
    inventory: number;
    sold: number;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "productId",
        header: "Mã sản phẩm",
    },
    {
        accessorKey: "productName",
        header: "Tên sản phẩm",
    },
    {
        accessorKey: "price",
        header: "Giá bán",
        cell({ row }) {
            const price = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(price);
            return <div className=" font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "sold",
        header: "Đã bán",
    },
    {
        accessorKey: "inventory",
        header: "Tồn kho",
    },
    {
        id: "actions",
        cell({ row }) {
            const productId = row.original.productId;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(productId)
                            }
                        >
                            Sao chép mã
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem>Xóa</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
