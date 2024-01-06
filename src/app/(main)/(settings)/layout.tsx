import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Setting",
    description:
        "Nền tảng Thương mại Điện tử đặc biệt dành cho sinh viên Đại học Thủ Dầu Một (TDMU). Trải nghiệm mua sắm, kinh doanh và chia sẻ tri thức trong một không gian kết nối độc đáo. Đăng nhập ngay để bắt đầu hành trình của bạn!",
};

const SettingLayout = ({ children }: { children: ReactNode }) => {
    return <MaxWidthWrapper className="py-6">{children}</MaxWidthWrapper>;
};

export default SettingLayout;
