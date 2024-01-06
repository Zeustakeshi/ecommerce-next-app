"use client";
import { FC } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    {
        name: "Tháng 1",
        uv: 4000,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        amt: 2100,
    },
];

type Props = {
    showChartTitle?: boolean;
    showChartName?: boolean;
};

const ChartOrderOverview: FC<Props> = ({
    showChartTitle: showTitle,
    showChartName: showName,
}) => {
    return (
        <div>
            {showTitle && (
                <h5 className="mb-4 text-xl text-muted-foreground font-semibold">
                    Đơn hàng
                </h5>
            )}
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="uv"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
            {showName && (
                <p className="text-center text-sm text-muted-foreground">
                    Thống kê số lượng đơn đặt hàng theo tháng
                </p>
            )}
        </div>
    );
};

export default ChartOrderOverview;
