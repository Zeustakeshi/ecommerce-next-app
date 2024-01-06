import { Alert } from "@/components/ui/alert";

import { auth } from "@/auth";
import {
    Bill,
    BillContent,
    BillFooter,
    BillHeader,
    BillOrderInfo,
    BillTitle,
} from "@/components/bills/Bill";
import { Button, buttonVariants } from "@/components/ui/button";
import redis from "@/lib/redis";
import { cn, generateSignature } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import db from "@/lib/db";
import { UserRole } from "@prisma/client";
import * as z from "zod";
import { NewShopSchema } from "@/schemas/newShop.schema";

const PaymentReturn = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    try {
        /**
         *  1/ kiểm tra người dùng có đăng nhập không
         *  2/ kiểm tra có đủ dữ liệu không
         *  3/ Kiểm tra trong cache có dữ liệu không
         *  4/ kiểm tra payload của dữ liệu trong cache có trùng với người dùng hiện tại không
         *  5/ gọi momo api để lấy thông tin order hợp lệ
         *  6/ nếu tất cả đều thành công lưu vào database và xóa cache
         */
        const session = await auth();

        if (!session?.user)
            throw new Error("Bạn phải đăng nhập để thực hiện chức năng này!");

        const signature = searchParams.signature;

        const { orderId, partnerCode, requestId, orderInfo } = searchParams;

        if (!partnerCode || !requestId || !orderId || !signature) {
            throw new Error("Dữ liệu không đủ hoặc không đúng định dạng");
        }
        const shopInfoJson = await redis.get(orderId as string);
        if (!shopInfoJson) {
            throw new Error("Không tìm thấy đơn hàng hoặc đơn hàng đã xử lý");
        }
        const shopInfo: z.infer<typeof NewShopSchema> & {
            payload: {
                name: string;
                email: string;
                id: string;
            };
        } = JSON.parse(shopInfoJson);

        if (
            shopInfo.payload?.name !== session.user.name ||
            shopInfo.payload?.email !== session.user.email
        ) {
            throw new Error(
                "Tại khoản hiện tại không có quyền truy cập trang này"
            );
        }

        /** GET VALID ORDER INFO */
        const response = await fetch(`${process.env.MOMO_URL}/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                partnerCode,
                requestId,
                orderId,
                signature: generateSignature(
                    {
                        accessKey: process.env.MOMO_ACCESS_KEY,
                        orderId,
                        partnerCode,
                        requestId,
                    },
                    process.env.MOMO_SECRET_KEY!
                ),
                lang: "vi",
            }),
            cache: "no-store",
        });

        const data = await response.json();

        if (data.resultCode !== 0) {
            throw new Error(data.message);
        } else {
            /** SAVE TO DB AND REMOVE CACHE */

            // create new payment

            const newReigsterPayment = await db.payment.create({
                data: {
                    id: data.orderId,
                    amount: data.amount,
                    message: data.message,
                    paymentOption: data.paymentOption,
                    payType: data.payType,
                    requestId: data.requestId,
                    transId: data.transId,
                },
            });

            // create new shop, shopProfile,

            await db.shop.create({
                data: {
                    name: shopInfo.name,
                    id: shopInfo.payload.id,
                    profile: {
                        create: {
                            description: shopInfo.description,
                            addressDistrict: shopInfo.address.district,
                            addressProvince: shopInfo.address.province,
                            addressWard: shopInfo.address.ward,
                            cardNumber: shopInfo.cardNumber,
                            phone: shopInfo.phone,
                            registerPaymentId: newReigsterPayment.id,
                        },
                    },
                },
            });

            // remove cache
            await redis.del(data.orderId);

            // create new role for user
            await db.role.create({
                data: {
                    userId: shopInfo.payload.id,
                    role: UserRole.SHOP,
                },
            });

            return (
                <Bill>
                    <BillHeader>
                        <BillTitle>Thanh toán thành công</BillTitle>
                    </BillHeader>
                    <BillContent>
                        <BillOrderInfo
                            customerName={`${shopInfo.payload.name} (${shopInfo.name})`}
                            customerEmail={shopInfo.payload.email}
                            orderId={data.orderId}
                            orderInfo={orderInfo as string}
                            orderType={data.payType}
                        />
                    </BillContent>
                    <BillFooter amount={data.amount}>
                        <div className="w-full flex justify-end items-center">
                            <Link
                                href="/manager/shop"
                                className={cn(
                                    "w-full md:w-auto",
                                    buttonVariants({})
                                )}
                            >
                                Xác nhận
                            </Link>
                        </div>
                    </BillFooter>
                </Bill>
            );
        }
    } catch (error: any) {
        return (
            <Bill>
                <BillHeader>
                    <BillTitle>Thanh toán thất bại</BillTitle>
                </BillHeader>
                <BillContent>
                    <Alert
                        variant="destructive"
                        className="flex justify-start gap-4 items-center"
                    >
                        <span>
                            <AlertTriangle />
                        </span>
                        <span>{error.message || "Lỗi không xác định"}</span>
                    </Alert>
                </BillContent>
                <div className="w-full flex justify-end items-center gap-5">
                    <Link
                        href="/"
                        className={cn(buttonVariants({}), "w-full md:w-auto")}
                    >
                        Trang chủ
                    </Link>
                </div>
            </Bill>
        );
    }
};

export default PaymentReturn;
