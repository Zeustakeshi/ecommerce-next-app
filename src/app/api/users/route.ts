import ProductRegisterRequest from "@/email-templates/ProductRegisterRequest";
import prisma from "@/lib/db";
import { mailSender } from "@/lib/mail";
import { render } from "@react-email/render";

export const GET = async () => {
    const emailHtml = render(
        ProductRegisterRequest({
            product: {
                name: "",
                description: "sdf",
                images: [
                    "https://res.cloudinary.com/daiuet5xc/image/upload/v1705302218/tdmu-eStore/products/clrcw2y1o0007p9643x8ve8mh/clrekql8800003r670me3x02g-e5ffbfcbdcc4eb006ed0.jpg",
                    "https://res.cloudinary.com/daiuet5xc/image/upload/v1705302218/tdmu-eStore/products/clrcw2y1o0007p9643x8ve8mh/clrekql8800003r670me3x02g-f878c5c8237b17be721e.jpg",
                    "https://res.cloudinary.com/daiuet5xc/image/upload/v1705302220/tdmu-eStore/products/clrcw2y1o0007p9643x8ve8mh/clrekql8800003r670me3x02g-a711a5b77554769450d2.png",
                ],
            },
            shop: {
                name: "",
                email: "adsf",
            },
        })
    );

    await mailSender({
        from: process.env.MAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "Yêu cầu Đăng Ký Sản Phẩm - TDMU eStore",
        html: emailHtml,
    });
    return new Response(JSON.stringify("oke"), { status: 200 });
};
