import { dateFormat } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { paymentWithMoMo } from "../../../../../testMomo";

export const POST = async (req: NextRequest) => {
    const { nextUrl } = req;
    const body = await req.json();

    const data = await paymentWithMoMo({
        amount: 20000,
        ipnHost: `${nextUrl.protocol}//${nextUrl.host}`,
        redirectUrl: `${nextUrl.origin}/payment-return/new-shop-checkout`,
        orderId: body.orderId,
        orderInfo: body.orderInfo,
        storeId: body.storeId,
    });

    return NextResponse.json(data);
};

export const GET = async () => {
    return NextResponse.json("hello world");
};
