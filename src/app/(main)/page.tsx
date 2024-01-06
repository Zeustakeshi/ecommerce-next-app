import { auth } from "@/auth";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import CartAbsolute from "@/components/cart/CartAbsolute";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    FileText,
    LucideIcon,
    ShoppingBasket,
    Store,
    Truck,
} from "lucide-react";
import Link from "next/link";

type Service = {
    name: string;
    Icon: LucideIcon;
    description: string;
};
const services: Service[] = [
    {
        name: "Cửa hàng",
        Icon: Store,
        description:
            "Khám phá không gian thương mại trực tuyến, nơi mà tâm huyết của sinh viên được biến đổi thành các sản phẩm và dịch vụ độc đáo. Với nền tảng cửa hàng trực tuyến của chúng tôi, sinh viên có cơ hội tạo ra và quản lý kinh doanh của mình, kết nối với cộng đồng và thu nhập từ sự sáng tạo của mình.",
    },
    {
        name: "Mua sắm",
        Icon: ShoppingBasket,
        description:
            "Dạo bước trong thế giới mua sắm trực tuyến tại nền tảng của chúng tôi, nơi tất cả những sản phẩm và dịch vụ được tinh chỉnh đặc biệt để đáp ứng nhu cầu của sinh viên. Từ sách giáo trình đến vật dụng học tập và những sản phẩm thiết yếu cho cuộc sống sinh viên, chúng tôi mang đến trải nghiệm mua sắm linh hoạt và thuận tiện.",
    },
    {
        name: "Giao hàng",
        Icon: Truck,
        description:
            "Sự thuận lợi tới cửa! Dịch vụ giao hàng nội bộ của chúng tôi không chỉ đơn giản là việc chuyển phát hàng, mà là cầu nối giữa những khoảnh khắc học tập và cuộc sống của sinh viên. Với chi phí rẻ và hiệu suất cao, chúng tôi đảm bảo mọi đơn hàng đều đến đúng địa điểm, đúng thời điểm.",
    },
    {
        name: "Chia sẻ",
        Icon: FileText,
        description:
            "Nơi gặp gỡ tri thức! Dựa vào cộng đồng sinh viên đa dạng, nền tảng chia sẻ tài liệu của chúng tôi là nguồn cảm hứng không ngừng cho việc học tập. Tìm kiếm và chia sẻ kiến thức, tài liệu hữu ích, và kinh nghiệm cá nhân, tạo ra một môi trường trực tuyến thú vị và sôi động.",
    },
];

export default async function Home() {
    const session = await auth();

    return (
        <>
            {!session?.user && (
                <MaxWidthWrapper>
                    <div className="py-20 mx-auto max-w-3xl flex flex-col items-center  text-center">
                        <h1 className="text-4xl font-bold tracking-tight leading-relaxed text-gray-900 sm:text-6xl">
                            <p className="">Chào mừng đến với</p>
                            <span className="text-blue-600 ">TDMU eStore</span>
                        </h1>
                        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                            Trang web thương mại điện tử độc đáo của Đại học Thủ
                            Dầu Một (TDMU), cung cấp nền tảng đa dịch vụ đặc
                            biệt dành cho sinh viên. Khám phá cửa hàng trực
                            tuyến, trải nghiệm mua sắm linh hoạt, giao hàng
                            nhanh chóng và chia sẻ tri thức hữu ích. Hãy tham
                            gia ngay để tận hưởng không gian kết nối độc đáo
                            giữa nhu cầu học tập và cuộc sống sinh viên!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <Link href="/products" className={buttonVariants()}>
                                Mua sắm ngay
                            </Link>
                            <Button variant={"ghost"}>
                                Dịch vụ nổi bật ⟶{" "}
                            </Button>
                        </div>
                    </div>
                    {/** TODO: List products */}
                </MaxWidthWrapper>
            )}

            <section className="py-20 bg-slate-50 rounded-lg w-full">
                <CartAbsolute></CartAbsolute>
                <MaxWidthWrapper>
                    <h3 className="text-xl sm:text-3xl font-bold text-gray-900">
                        Dịch vụ của chúng tôi
                    </h3>
                    <div className="mt-6 grid grid-cols-1 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-8 lg:gap-y-0 items-start">
                        {services.map((service, index) => {
                            return (
                                <div
                                    key={index}
                                    className="md:flex-shrink-0 flex-col flex justify-center items-center  sm:p-4 rounded-md"
                                >
                                    <div className="rounded-full w-16 h-16 flex justify-center items-center bg-slate-300 bg-opacity-50 backdrop-blur-xl">
                                        <service.Icon className="w-1/3 h-1/3" />
                                    </div>
                                    <div className="mt-5 text-center">
                                        <h4 className="text-xl font-semibold my-3">
                                            {service.name}
                                        </h4>
                                        <p className="text-muted-foreground">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}
