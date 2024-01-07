import { paymentWithMoMo } from "@/lib/payment";

const data = {
    email: "minhhieu123@gmail.com",
    name: "minhhieu",
    app: "CHAT_APP_DEMO",
};

const momoResponse = paymentWithMoMo({
    ipnHost:
        "https://ecommerce-next-app-git-fixbug-momo-zeustakeshi.vercel.app",
    orderId: "fcfd971adfb10f4",
    redirectUrl: `https://ecommerce-next-app-git-fixbug-momo-zeustakeshi.vercel.app/payment-return/new-shop-checkout`,
    items: [
        {
            name: "Đăng ký mở cửa hàng với Tdmu eStore",
            price: 20000,
            quantity: 1,
            taxAmount: 0,
        },
    ],
    userInfo: {
        email: data.email,
        name: data.name,
    },
    orderDescription: `${data.app.toUpperCase()}_THANH_TOAN_PHI_MO_CUA_HANG`,
});

momoResponse.then((data) => {
    console.log(data);
});
