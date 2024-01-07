// import { paymentWithMoMo } from "@/lib/payment";
import crypto from "crypto";
// const data = {
//     email: "minhhieu123@gmail.com",
//     name: "minhhieu",
//     app: "CHAT_APP_DEMO",
// };

// const momoResponse = paymentWithMoMo({
//     ipnHost: "https://ecommerce-next-1vv53c15o-zeustakeshi.vercel.app",
//     orderId: "b4001fefee4f3a2",
//     redirectUrl: `https://ecommerce-next-1vv53c15o-zeustakeshi.vercel.app/payment-return/new-shop-checkout`,
//     items: [
//         {
//             name: "Đăng ký mở cửa hàng với Tdmu eStore",
//             price: 20000,
//             quantity: 1,
//             taxAmount: 0,
//         },
//     ],
//     userInfo: {
//         email: data.email,
//         name: data.name,
//     },
//     orderDescription: `${data.app.toUpperCase()}_THANH_TOAN_PHI_MO_CUA_HANG`,
// });

// momoResponse.then((data) => {
//     const x = {
//         requestBody: {
//             partnerCode: "MOMO",
//             partnerName: "Tdmu eStore",
//             storeId: "TDMU_ESTORE",
//             requestId: "b4001fefee4f3a2-order-tdmu-estore",
//             amount: 20000,
//             orderId: "b4001fefee4f3a2",
//             orderInfo: "CHAT_APP_DEMO_THANH_TOAN_PHI_MO_CUA_HANG",
//             redirectUrl:
//                 "https://ecommerce-next-1vv53c15o-zeustakeshi.vercel.app/payment-return/new-shop-checkout",
//             ipnUrl: "https://ecommerce-next-1vv53c15o-zeustakeshi.vercel.app/api/checkout/momo_ipn",
//             lang: "vi",
//             requestType: "payWithMethod",
//             autoCapture: true,
//             extraData: "",
//             orderGroupId: "",
//             signature:
//                 "e0994bf5ddac26dc9ff485035062e5e3e773e29c178ac447bbfb8a0e18fe32d5",
//             orderExpireTime: 30,
//             items: [[Object]],
//             userInfo: { email: "minhhieu123@gmail.com", name: "minhhieu" },
//             deliveryInfo: undefined,
//         },
//         signature:
//             "e0994bf5ddac26dc9ff485035062e5e3e773e29c178ac447bbfb8a0e18fe32d5",
//     };
//     console.log(JSON.stringify(data) === JSON.stringify(x));
// });

const signature = crypto
    .createHmac("sha256", " K951B6PE1waDMi640xX08PD3vg6EkVlz")
    .update(
        "accessKey=F8BBA842ECF85&amount=20000&extraData=&ipnUrl=https://ecommerce-next-app-git-fixbug-momo-zeustakeshi.vercel.app/api/checkout/momo_ipn&orderId=65263013328e77e&orderInfo=CHAT_APP_DEMO_THANH_TOAN_PHI_MO_CUA_HANG&partnerCode=MOMO&redirectUrl=https://ecommerce-next-app-git-fixbug-momo-zeustakeshi.vercel.app/payment-return/new-shop-checkout&requestId=65263013328e77e-order-tdmu-estore&requestType=payWithMethod"
    )
    .digest("hex");

console.log(signature);
