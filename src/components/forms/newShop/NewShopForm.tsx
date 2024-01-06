"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { NewShopSchema } from "@/schemas/newShop.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputAddress from "../InputAddress";
import { useTransition } from "react";

type Props = {};

const NewShopForm = (props: Props) => {
    const [isPending, startPayment] = useTransition();

    const form = useForm<z.infer<typeof NewShopSchema>>({
        resolver: zodResolver(NewShopSchema),
    });

    const onSubmit = async (values: z.infer<typeof NewShopSchema>) => {
        startPayment(async () => {
            try {
                const response = await fetch("/api/shop/new", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                    cache: "no-store",
                });
                const paymentUrl = await response.json();
                if (typeof paymentUrl === "string")
                    window.location.replace(paymentUrl);
            } catch (error) {
                throw error;
            }
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="my-10 space-y-5"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-2xl text-muted-foreground">
                                Tên cửa hàng
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="ví dụ: Shop Minh Anh"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormDescription>
                                Tên mỗi cửa hàng không trùng nhau đây là tên duy
                                nhất để khách hàng có thể tìm thấy cửa hàng của
                                bạn
                            </FormDescription>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <FormField
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-2xl text-muted-foreground">
                                Địa chỉ
                            </FormLabel>
                            <FormControl>
                                <InputAddress
                                    address={field.value}
                                    onChange={(value) => {
                                        form.setValue("address", value);
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                Địa chỉ của cửa hàng nơi người giao hàng đến lấy
                                hàng
                            </FormDescription>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <div className=" grid grid-cols-1 md:grid-cols-2  justify-between items-start gap-5 ">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel className="text-2xl text-muted-foreground">
                                    Số điện thoại
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Số điện thoại"
                                        {...field}
                                    ></Input>
                                </FormControl>
                                <FormDescription>
                                    Số điện thoại của cửa hàng
                                </FormDescription>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel className="text-2xl text-muted-foreground">
                                    Số tài khoản
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Số tài khoản"
                                        {...field}
                                    ></Input>
                                </FormControl>
                                <FormDescription>
                                    Số tài khoản ngân hàng của cửa hàng
                                </FormDescription>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="text-2xl text-muted-foreground">
                                Mô tả
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Nhập mô tả cửa hàng của bạn"
                                    {...field}
                                ></Textarea>
                            </FormControl>
                            <FormDescription>
                                Mô tả giúp mọi người biết thêm về cửa hàng của
                                bạn
                            </FormDescription>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <div className="text-center text-sm text-muted-foreground !mt-6 ">
                    <p>
                        Bằng việc đăng ký kinh doanh cửa hàng của bạn với Tdmu
                        Estore bạn đã đọc qua về
                    </p>
                    <Link
                        href="/terms-and-conditions"
                        className={cn(
                            buttonVariants({
                                variant: "link",
                            }),
                            "px-1 py-0"
                        )}
                    >
                        Điều khoản dịch vụ bán hàng
                    </Link>
                    &
                    <Link
                        href="/terms-and-conditions"
                        className={cn(
                            buttonVariants({
                                variant: "link",
                            }),
                            "px-1 py-0"
                        )}
                    >
                        Chính sách bán hàng
                    </Link>
                </div>
                <div className="flex justify-end gap-5">
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "w-full md:w-auto"
                        )}
                    >
                        Hủy
                    </Link>
                    <Button disabled={isPending} className="w-full md:w-auto">
                        {isPending
                            ? "Đang chuyển hướng"
                            : " Đăng ký và thanh toán"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default NewShopForm;
