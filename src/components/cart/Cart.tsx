import { Divide, ShoppingBag } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

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
];

const Cart = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost">
                    <ShoppingBag />
                </Button>
            </SheetTrigger>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>Giỏ hàng</SheetTitle>
                    <SheetDescription>
                        Sản phẩm trong giỏ hàng của bạn sẽ hiện thị ở đây
                    </SheetDescription>
                </SheetHeader>
                {cartItems.length > 0 ? (
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
                            {cartItems.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {item.product.name}
                                        </TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell className="text-right">
                                            {item.product.price * item.quantity}{" "}
                                            VND
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
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
                {cartItems.length > 0 && (
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Thanh toán</Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default Cart;
