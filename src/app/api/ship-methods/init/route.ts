import db from "@/lib/db";
import { ShipMethod } from "@prisma/client";
import { NextResponse } from "next/server";

const shipMethods: ShipMethod[] = [
    {
        code: "G_EXPRESS",
        name: "GExpress",
        description:
            "GExpress là đối tác vận chuyển chính thức của tdmu eStore, đảm bảo cung cấp dịch vụ giao hàng nhanh chóng, tiết kiệm và phù hợp với túi tiền của sinh viên.",
    },
    {
        code: "SELLER_SHIPPING",
        name: "Người bán tự vận chuyển",
        description:
            "Phương thức vận chuyển này cho phép người bán hàng tự chịu trách nhiệm và tự vận chuyển sản phẩm đến địa chỉ của bạn. Thông tin chi tiết sẽ được cung cấp bởi người bán.",
    },
];

export const GET = async () => {
    const createShipMethodPromises = shipMethods.map(async (ship) => {
        return await db.shipMethod.create({
            data: ship,
        });
    });

    await Promise.all(createShipMethodPromises);

    return NextResponse.json("oke");
};
