import { generateSignature, nanoid } from "./utils";

type MomoPaymentOption = {
    ipnHost: string;
    redirectUrl: string;
    items: {
        id?: string;
        name: string;
        description?: string;
        category?: string;
        quantity: number;
        price: number;
        taxAmount: number;
        brand?: string;
        imageUrl?: string;
    }[];
    orderId: string;
    orderDescription?: string;
    userInfo: {
        name: string;
        email: string;
    };
    deliveryInfo?: {
        deliveryAddress: string;
        deliveryFee: number;
    };
};

/**
 * EXAMPLE CODE
 * ```js
    paymentWithMoMo({
        ipnHost: "localhost:3000",
        redirectUrl: "http://localhost:3000/payment-return/new-shop-checkout",
        orderId: 'orderid_test'
        items: [
            {
                id: "204727",
                name: "YOMOST Bac Ha&Viet Quat 170ml",
                description: "YOMOST Sua Chua Uong Bac Ha&Viet Quat 170ml/1 Hop",
                category: "beverage",
                brand: "Vinamilk",
                price: 11000,
                quantity: 5,
                taxAmount: 0,
                imageUrl:
                    "https://www.ketnoitieudung.vn/data/bt10/bua-nho-dinh-stanley-51-082-1.jpg",
            },
        ],
        userInfo: {
            email: "hieu@gmail.com",
            name: "Minh Hieu",
        },
        deliveryInfo: {
            deliveryAddress: "8 Hoàng Văn Thái, Tân Phú, Quận 7",
            deliveryFee: 20000,
        },
    }).then((data) => console.log(data));
 * ```
 *
 **/
export const paymentWithMoMo = async ({
    ipnHost,
    redirectUrl,
    orderDescription,
    items,
    userInfo,
    deliveryInfo,
    orderId,
}: MomoPaymentOption) => {
    const accessKey = process.env.MOMO_ACCESS_KEY!;
    const secretKey = process.env.MOMO_SECRET_KEY!;
    const partnerCode = "MOMO";
    const ipnUrl = `${ipnHost}/api/checkout/momo_ipn`;
    const requestType = "payWithMethod";
    const extraData = "";
    const orderGroupId = "";
    const autoCapture = true;
    const lang = "vi";
    const requestId = `${orderId}-order-tdmu-estore`;
    const orderInfo = orderDescription || `THANH TOAN DON HANG ${orderId}`;
    const storeId = "TDMU_ESTORE";
    const partnerName = "Tdmu eStore";
    const orderExpireTime = 30;
    let amount = items.reduce((prev, curr) => {
        return prev + (curr.price + curr.taxAmount) * curr.quantity;
    }, 0);

    if (deliveryInfo) {
        amount += deliveryInfo.deliveryFee;
    }

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
        partnerCode,
        partnerName,
        storeId,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        lang,
        requestType,
        autoCapture,
        extraData,
        orderGroupId,
        signature,
        orderExpireTime,
        items,
        userInfo,
        deliveryInfo,
    };
    console.log({ requestBody, signature });
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
};
