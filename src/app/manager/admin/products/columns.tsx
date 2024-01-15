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
import { fomatCurrency } from "@/lib/utils";
import { ProductStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    shopName: string;
    status: ProductStatus;
};

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "Mã sản phẩm",
    },
    {
        accessorKey: "name",
        header: "Tên sản phẩm",
    },
    {
        accessorKey: "shopName",
        header: "Cửa hàng",
    },
    {
        accessorKey: "description",
        header: "Mô tả",
        cell({ row }) {
            const description = row.getValue("description") as string;
            return (
                <p className="max-w-[320px] overflow-hidden text-nowrap text-ellipsis">
                    {description}
                </p>
            );
        },
    },
    {
        accessorKey: "category",
        header: "Danh mục",
    },
    {
        accessorKey: "price",
        header({ column }) {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Giá
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell({ row }) {
            return fomatCurrency(row.getValue("price"));
        },
    },
    {
        id: "actions",
        header: "Lựa chọn",
        cell({ row }) {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(product.id)
                            }
                        >
                            Copy mã sản phẩm
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            {(() => {
                                switch (product.status) {
                                    case "PENDING":
                                        return "Duyệt sản phẩm";
                                    case "PUBLIC":
                                        return "Ẩn sản phẩm";
                                    case "REJECT":
                                        return "Chuyển sang chờ duyệt";
                                    default:
                                        break;
                                }
                            })()}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Xem cửa hàng</DropdownMenuItem>
                        <DropdownMenuItem>
                            Xem chi tiết sản phẩm
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
