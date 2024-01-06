import { cn } from "@/lib/utils";
import React, { ComponentProps, FC, ReactNode } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

type BillProps = {
    children: ReactNode;
} & ComponentProps<"div">;
export const Bill: React.FC<BillProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "bg-gradient-to-l from-white to-slate-100 shadow-[rgba(17,17,26,0.1)_0px_4px_16px,rgba(17,17,26,0.05)_0px_8px_32px] p-5 rounded-2xl sm:w-[80%] md:w-[70%] xl:w-[50%]  w-[90svw] space-y-5 max-h-[80svh] overflow-y-scroll custom-scroll ",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

type BillHeaderProps = { children: ReactNode } & ComponentProps<"div">;
export const BillHeader: React.FC<BillHeaderProps> = ({
    children,
    ...props
}) => {
    return (
        <div {...props}>
            {children}
            <Separator className=""></Separator>
        </div>
    );
};

type BillTitleProps = {
    children: ReactNode;
} & ComponentProps<"h1">;
export const BillTitle: FC<BillTitleProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <h1
            className={cn(
                "text-2xl font-semibold text-center text-muted-foreground my-4",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
};

type BillContentProps = { children: ReactNode } & ComponentProps<"div">;
export const BillContent: FC<BillContentProps> = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};

type BillOrderInfoProps = {
    customerName: string;
    customerEmail: string;
    orderId: string;
    orderInfo: string;
    orderType: string;
} & ComponentProps<"div">;

export const BillOrderInfo: FC<BillOrderInfoProps> = ({
    customerName,
    customerEmail,
    orderId,
    orderInfo,
    orderType,
    className,
    ...props
}) => {
    return (
        <div className={cn("space-y-3", className)} {...props}>
            <h3 className="text-lg text-muted-foreground font-semibold">
                Thông tin khách hàng
            </h3>
            <Table suppressHydrationWarning>
                <TableBody suppressHydrationWarning>
                    <TableRow className="border-none outline-none flex justify-between px-5 py-3">
                        <span className=" font-semibold">Tên khách hàng:</span>
                        <span>{customerName}</span>
                    </TableRow>
                    <TableRow className="border-none outline-none flex justify-between px-5 py-3">
                        <span className=" font-semibold">Email:</span>
                        <span>{customerEmail}</span>
                    </TableRow>
                    <TableRow className="border-none outline-none flex justify-between px-5 py-3">
                        <span className=" font-semibold">Số hóa đơn:</span>
                        <span>{orderId}</span>
                    </TableRow>
                    <TableRow className="border-none outline-none flex justify-between px-5 py-3">
                        <span className=" font-semibold">
                            Thông tin đơn hàng:
                        </span>
                        <span>{orderInfo}</span>
                    </TableRow>
                    <TableRow className="border-none outline-none flex justify-between px-5 py-3">
                        <span className=" font-semibold">
                            Phương thức thanh toán
                        </span>
                        <span>{orderType}</span>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

type BillProductListProps = {
    products: {
        name: string;
        quantity: number;
        price: number;
    }[];
} & ComponentProps<"div">;

export const BillProductList: FC<BillProductListProps> = ({
    products,
    ...props
}) => {
    return (
        <div {...props}>
            <h3 className="text-lg text-muted-foreground font-semibold">
                Sản phẩm
            </h3>
            <Table suppressHydrationWarning>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-start">
                            Sản phẩm
                        </TableHead>
                        <TableHead className="w-[100px] text-center">
                            Số lượng
                        </TableHead>
                        <TableHead className="w-[100px] text-end">
                            Giá
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="w-full">
                    {products.map((product, index) => {
                        return (
                            <TableRow key={index} className="w-full">
                                <TableCell className="font-medium">
                                    {product.name}
                                </TableCell>
                                <TableCell className="font-medium text-center">
                                    {product.quantity}
                                </TableCell>
                                <TableCell className="font-medium text-end">
                                    {product.price}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

type BillFooterProps = {
    amount: number;
    children: ReactNode;
} & ComponentProps<"div">;

export const BillFooter: FC<BillFooterProps> = ({ amount, children }) => {
    return (
        <div>
            <Separator></Separator>
            <div className="w-full flex justify-between items-center my-4">
                <h2 className="text-lg font-semibold text-muted-foreground">
                    Tổng thanh toán:
                </h2>
                <p className="font-semibold text-xl ">{amount}</p>
            </div>
            <Separator></Separator>

            <span className="text-xs text-muted-foreground ">
                <span className="font-semibold">Lưu ý: </span>
                <span>Đơn vị thanh toán tính bằng vnđ</span>
            </span>
            <p className="text-muted-foreground font-bold text-lg my-5 text-center">
                Cảm ơn quý khách!
            </p>

            {children}
        </div>
    );
};
