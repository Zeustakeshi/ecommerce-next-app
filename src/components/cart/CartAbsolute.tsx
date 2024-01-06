import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type CartItemType = {
    product: {
        name: string;
        price: number;
    };
    quantity: number;
};
const cartItems: CartItemType[] = [
    {
        product: {
            name: "Trái cam màu cam",
            price: 20000,
        },
        quantity: 2,
    },
    {
        product: {
            name: "Táo xanh",
            price: 1000,
        },
        quantity: 9,
    },
    {
        product: {
            name: "Dép lào",
            price: 20000,
        },
        quantity: 1,
    },
    {
        product: {
            name: "Dép lào",
            price: 20000,
        },
        quantity: 1,
    },
    {
        product: {
            name: "Dép lào",
            price: 20000,
        },
        quantity: 1,
    },
    {
        product: {
            name: "Dép lào",
            price: 20000,
        },
        quantity: 1,
    },
    {
        product: {
            name: "Dép lào",
            price: 20000,
        },
        quantity: 1,
    },
    {
        product: {
            name: "Dép lào",
            price: 20000,
        },
        quantity: 1,
    },
    {
        product: {
            name: "Dép lào",
            price: 20000,
        },
        quantity: 1,
    },
    {
        product: {
            name: "Dép lào",
            price: 20000,
        },
        quantity: 1,
    },
    {
        product: {
            name: "Dép lào",
            price: 20000,
        },
        quantity: 1,
    },
];

const CartAbsolute = () => {
    return (
        <Drawer>
            <DrawerTrigger
                asChild
                className="md:hidden fixed bottom-[8svh] right-[10svw]"
            >
                <Button className="w-16 h-16 shadow-xl flex justify-center items-center rounded-full ">
                    <ShoppingBag />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="min-h-[50svh] p-3">
                <h4 className="text-lg text-left font-medium">Giỏ hàng</h4>
                {cartItems.length > 0 ? (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">Sảm phẩm</TableHead>
                                    <TableHead>Số lượng</TableHead>
                                    <TableHead className="text-right">
                                        Giá
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cartItems.slice(0, 6).map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {item.product.name}
                                            </TableCell>
                                            <TableCell>
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {item.product.price *
                                                    item.quantity}{" "}
                                                VND
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {cartItems.length > 6 && (
                            <Link
                                href="/cart"
                                className="my-3 text-center text-primary"
                            >
                                xem thêm
                            </Link>
                        )}
                        <Button className="mt-8"> Thanh toán ngay</Button>
                    </>
                ) : (
                    <div className="h-full w-full flex flex-col justify-center items-center">
                        <div className="bg-blue-50 rounded-full">
                            <Image
                                src="/shopping-bag.png"
                                width={200}
                                height={200}
                                alt="empty cart"
                            ></Image>
                        </div>
                        <h5 className="text-sm text-muted-foreground my-6">
                            Giỏ hàng của bạn chưa có gì
                            <Link
                                href="/products"
                                className={cn(
                                    buttonVariants({ variant: "link" }),
                                    "p-0 ml-1"
                                )}
                            >
                                mua sắm thôi
                            </Link>
                        </h5>
                    </div>
                )}
            </DrawerContent>
        </Drawer>
    );
};

export default CartAbsolute;
