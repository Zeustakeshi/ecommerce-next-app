"use server";
import { dateFormat, generateSignature } from "@/lib/utils";
import crypto, { randomInt } from "crypto";

type MomoPaymentOption = {
    amount: number;
    ipnHost: string;
    redirectUrl: string;
    orderId: string;
    orderInfo: string;
    storeId: string;
};

export async function paymentWithMoMo({
    amount,
    ipnHost,
    redirectUrl,
    orderId,
    orderInfo,
    storeId,
}: MomoPaymentOption) {
    const accessKey = process.env.MOMO_ACCESS_KEY!;
    const secretKey = process.env.MOMO_SECRET_KEY!;
    const partnerCode = "MOMO";
    const ipnUrl = `${ipnHost}/api/checkout/momo_ipn`;
    const requestType = "payWithMethod";
    const requestId = orderId;
    const extraData = "";
    const paymentCode =
        "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
    const orderGroupId = "";
    const autoCapture = true;
    const lang = "vi";

    // Tạo chữ ký

    const signature = generateSignature(
        {
            accessKey,
            amount,
            extraData,
            ipnUrl,
            orderId,
            orderInfo,
            partnerCode,
            redirectUrl,
            requestId,
            requestType,
        },
        secretKey
    );

    // Tạo body cho yêu cầu thanh toán
    const requestBody = {
        partnerCode: partnerCode,
        partnerName: "Tdmu eStore",
        storeId: storeId,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature,
        orderExpireTime: 30,
    };

    // Thực hiện yêu cầu thanh toán sử dụng fetch
    const response = await fetch(`${process.env.MOMO_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    // Xử lý kết quả
    return await response.json();
}

// paymentWithMoMo({
//     amount: 10000,
//     ipnHost: "localhost:3000",
//     orderId: crypto.randomUUID(),
//     orderInfo: "hi xon chao",
//     redirectUrl: "htt",
//     storeId: "sdsfasdfasdfasd",
// }).then((data) => console.log(data));

// const checkTransactionStatus = async (
//     requestId: string,
//     orderId: string,
//     signature: string
// ) => {
//     const checkReponse = await fetch(
//         "https://test-payment.momo.vn:443/v2/gateway/api/query",
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 partnerCode: "MOMO",
//                 requestId: requestId,
//                 orderId: orderId,
//                 signature: signature,
//                 lang: "vi",
//             }),
//         }
//     );

//     return checkReponse.json();
// };

console.log(dateFormat(new Date()) + randomInt(200));
