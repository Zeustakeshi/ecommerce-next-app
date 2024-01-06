import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    MessageSquareReply,
    Receipt,
    ShoppingCart,
    TrendingDown,
    TrendingUp,
} from "lucide-react";
import { FC, ReactNode } from "react";

type ShopOverviewData = {
    lastMonthData: number;
    currentMonthData: number;
};
type ShopOverviewType = {
    soldProducts: ShopOverviewData;
    totalOrder: ShopOverviewData;
    reviews: ShopOverviewData;
};
const getOverview = async (): Promise<ShopOverviewType> => {
    return {
        reviews: {
            currentMonthData: 1000,
            lastMonthData: 0,
        },
        totalOrder: {
            currentMonthData: 500,
            lastMonthData: 2000,
        },
        soldProducts: {
            currentMonthData: 300,
            lastMonthData: 200,
        },
    };
};

const ShopOverview = async () => {
    const { reviews, soldProducts, totalOrder } = await getOverview();
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <ShopOverviewCard
                icon={<ShoppingCart />}
                title="Đã bán"
                description="Sản phẩm đã bán trong tháng này"
                {...soldProducts}
            />
            <ShopOverviewCard
                icon={<Receipt />}
                title="Đơn hàng"
                description="Số đơn hàng trong tháng này"
                {...totalOrder}
            />
            <ShopOverviewCard
                icon={<MessageSquareReply />}
                title="Đánh giá"
                description="Số phản hồi của khách hàng trong tháng này"
                {...reviews}
            />
        </section>
    );
};

type ShopOverviewCardProps = {
    title: string;
    description: string;
    lastMonthData: number;
    currentMonthData: number;
    icon: ReactNode;
};

const ShopOverviewCard: FC<ShopOverviewCardProps> = ({
    currentMonthData,
    description,
    lastMonthData,
    title,
    icon,
}) => {
    const distance = currentMonthData - lastMonthData;
    let percent = Math.min((Math.abs(distance) / lastMonthData) * 100, 200);

    const status = distance < 0 ? "DESC" : "ASC";

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-muted-foreground flex gap-3 mb-2">
                    <span>{icon}</span>
                    <span>{title}</span>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="">
                <h4 className="text-3xl font-semibold mb-2">
                    {currentMonthData}
                </h4>
                <div className="w-full flex justify-start items-center gap-2 text-sm font-semibold">
                    <div
                        className={cn(
                            "flex justify-start gap-1 items-center",
                            status === "ASC" && "text-green-600",
                            status === "DESC" && "text-rose-600"
                        )}
                    >
                        <span className="text-xs">
                            {status === "ASC" && <TrendingUp />}
                            {status === "DESC" && <TrendingDown />}
                        </span>
                        <span>{percent}%</span>
                    </div>
                    <p className="text-muted-foreground">
                        {status === "ASC" && "+"}
                        {distance} tháng này
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ShopOverview;
