"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fomatCurrency } from "@/lib/utils";
import { FC } from "react";
import { Switch } from "../ui/switch";
type Props = {
    weight: number;
    width: number;
    height: number;
    long: number;
};

const InputDeliveryPrice: FC<Props> = (props) => {
    return (
        <Table>
            <TableCaption>Phí vận chuyển</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Dịch vụ vận chuyển</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Kích hoạt</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">GExpress</TableCell>
                    <TableCell className="font-medium">
                        {fomatCurrency(2000)}
                    </TableCell>
                    <TableCell className="font-medium">
                        <Switch />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default InputDeliveryPrice;
