import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartOrderOverview from "../chart/ChartOrderOverview";

/** TODO: HANDLE get data */
const ShopAnalyticsOverview = async () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-muted-foreground flex gap-3 mb-2">
                        Đơn hàng
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartOrderOverview showChartName />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-muted-foreground flex gap-3 mb-2">
                        Đơn hàng
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartOrderOverview showChartName />
                </CardContent>
            </Card>
        </div>
    );
};

export default ShopAnalyticsOverview;
