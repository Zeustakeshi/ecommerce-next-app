import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "TDMU eStore Sàn thương mại điện tử TDMU",
        template: "%s - TDMU eStore (Sàn thương mại điện tử TDMU)",
    },
    description:
        "Trang web thương mại điện tử độc đáo của Đại học Thủ Dầu Một (TDMU), cung cấp nền tảng đa dịch vụ đặc biệt dành cho sinh viên. Khám phá cửa hàng trực tuyến, trải nghiệm mua sắm linh hoạt, giao hàng nhanh chóng và chia sẻ tri thức hữu ích. Hãy tham gia ngay để tận hưởng không gian kết nối độc đáo giữa nhu cầu học tập và cuộc sống sinh viên!",
    keywords:
        "đại học Thủ Dầu Một, TDMU, thương mại điện tử, cửa hàng trực tuyến, mua sắm sinh viên, giao hàng nhanh, giao hàng giá rẻ ,chia sẻ kiến thức, chia sẻ tài liệu, mua bán đồ cũ",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={cn("relative h-full font-sans", inter.className)}>
                <main className={cn("min-h-dvh flex flex-col items-center")}>
                    {children}
                </main>
            </body>
        </html>
    );
}
