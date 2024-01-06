import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
    description:
        "Nền tảng Thương mại Điện tử đặc biệt dành cho sinh viên Đại học Thủ Dầu Một (TDMU). Trải nghiệm mua sắm, kinh doanh và chia sẻ tri thức trong một không gian kết nối độc đáo. Đăng nhập ngay để bắt đầu hành trình của bạn!",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <MaxWidthWrapper>
            <div className="w-full h-full flex justify-center items-center py-8">
                <div className="md:w-[70%] lg:w-[40%] w-full min-h-64 bg-white shadow-lg rounded-xl p-5 md:p-8 border">
                    {children}
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default AuthLayout;
