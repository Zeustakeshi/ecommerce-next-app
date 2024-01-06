import Header from "@/components/header/Header";
import HeaderMobile from "@/components/header/HeaderMobile";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppProvider from "../../context/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "TDMU eStore Sàn thương mại điện tử TDMU",
        template: "%s - TDMU eStore (Sàn thương mại điện tử TDMU)",
    },
    description:
        "Trang web thương mại điện tử độc đáo của Đại học Thủ Dầu Một (TDMU), cung cấp nền tảng đa dịch vụ đặc biệt dành cho sinh viên. Khám phá cửa hàng trực tuyến, trải nghiệm mua sắm linh hoạt, giao hàng nhanh chóng và chia sẻ tri thức hữu ích. Hãy tham gia ngay để tận hưởng không gian kết nối độc đáo giữa nhu cầu học tập và cuộc sống sinh viên!",
    keywords:
        "đại học Thủ Dầu Một, TDMU, thương mạilobals.css' điện tử, cửa hàng trực tuyến, mua sắm sinh viên, giao hàng nhanh, giao hàng giá rẻ ,chia sẻ kiến thức, chia sẻ tài liệu, mua bán đồ cũ",
};

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppProvider>
            <div className="bg-white sticky top-0 z-50 inset-0  shadow-sm backdrop-blur bg-opacity-50 w-full backdrop:blur-0">
                <Header></Header>
                <HeaderMobile></HeaderMobile>
            </div>

            <div className="flex-grow flex-1 w-full">{children}</div>
        </AppProvider>
    );
}
