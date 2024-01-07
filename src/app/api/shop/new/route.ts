import { auth } from "@/auth";
import {
    BadRequestException,
    InternalServerError,
    UnauthorizedEception,
} from "@/lib/exception";
import { paymentWithMoMo } from "@/lib/payment";
import redis from "@/lib/redis";
import { nanoid } from "@/lib/utils";
import { NewShopSchema } from "@/schemas/newShop.schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const session = await auth();
    const body = await req.json();
    if (!session?.user) {
        return NextResponse.json(new UnauthorizedEception(), { status: 401 });
    }
    if (session?.user.roles.includes("SHOP")) {
        return NextResponse.json({
            message: "Tài khoản của bạn đã là tài khoản người bán",
        });
    }

    const validateShopInfo = NewShopSchema.safeParse(body);
    if (!validateShopInfo.success) throw new BadRequestException();

    const orderId = nanoid();

    try {
        /** SAVE SHOP INFO TO CACHE */
        await redis.set(
            orderId,
            JSON.stringify({
                ...validateShopInfo.data,
                payload: {
                    name: session.user.name,
                    email: session.user.email,
                    id: session.user.id,
                },
            })
        );
        // set ttl to one hour
        await redis.expire(orderId, 3600);

        /** CALL MOMO API GET PAY_URL */
        const momoResponse = await paymentWithMoMo({
            orderId: orderId,
            redirectUrl: `${req.nextUrl.origin}/payment-return/new-shop-checkout`,
            items: [
                {
                    name: "Đăng ký mở cửa hàng với Tdmu eStore",
                    price: 20000,
                    quantity: 1,
                    taxAmount: 0,
                },
            ],
            userInfo: {
                email: session.user.email!,
                name: session.user.name!,
            },
            orderDescription: `${validateShopInfo.data.name.toUpperCase()} THANH TOAN PHI MO CUA HANG`,
        });

        if (momoResponse.resultCode === 0) {
            return NextResponse.json(momoResponse.shortLink);
        } else {
            console.log({ momoResponse });
            throw new InternalServerError(
                `Can't get momo payUrl ${JSON.stringify(momoResponse)}`
            );
        }
    } catch (error: any) {
        throw new InternalServerError(error.message);
    }
};
