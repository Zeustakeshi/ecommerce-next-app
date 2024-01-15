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
import useDebounce from "@/hooks/useDebounce";
import { cn, fomatCurrency } from "@/lib/utils";
import { ShipMethod, ShipMethodCode } from "@prisma/client";
import { Pen } from "lucide-react";

import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

type DeliveryCostTableValue = {
    code: ShipMethodCode;
    cost: number;
};

type Props = {
    weight: number;
    height: number;
    width: number;
    long: number;
    onChange?: (value: DeliveryCostTableValue[]) => void;
    values: DeliveryCostTableValue[];
};

const DeliveryCostTable: FC<Props> = (props) => {
    const [shipMethodLoading, setShipMethodLoading] = useState<boolean>(false);

    const widthDebounce = useDebounce(props.width);
    const heightDebounce = useDebounce(props.height);
    const longDebounce = useDebounce(props.long);
    const weightDebounce = useDebounce(props.weight);

    const [shipMethods, setShipMethod] = useState<
        (ShipMethod & {
            isActive: boolean;
            cost: number;
        })[]
    >([]);

    useEffect(() => {
        (async () => {
            try {
                setShipMethodLoading(true);
                const response = await fetch("/api/ship-methods", {
                    cache: "no-store",
                });

                const data = await response.json();

                const shipMethods = data.map((shipMethod: ShipMethod) => {
                    const activeShipMethod = props.values.find(
                        (value) => value.code === shipMethod.code
                    );
                    return {
                        ...shipMethod,
                        isActive: !!activeShipMethod,
                        cost: activeShipMethod?.cost,
                    };
                });

                setShipMethod(shipMethods);
                setShipMethodLoading(false);
            } catch (error) {
                console.log({ error });
            }
        })();
    }, []);

    return (
        <div className="my-8">
            <h4 className="mb-5 text-xl font-semibold">Bảng giá vận chuyển:</h4>
            <Table>
                <TableCaption>
                    {shipMethodLoading ? "đang tải giao hàng" : "phí giao hàng"}
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Dịch vụ vận chuyển</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Kích hoạt</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {shipMethods.map((shipMethod) => (
                        <DeliveryCostRow
                            onChange={({ cost, isActive }) => {
                                if (isActive) {
                                    const values = props.values.filter(
                                        (value) =>
                                            value.code !== shipMethod.code
                                    );
                                    values.push({
                                        code: shipMethod.code,
                                        cost: cost,
                                    });
                                    props.onChange?.(values);
                                } else {
                                    props.onChange?.(
                                        props.values.filter((value) => {
                                            return (
                                                value.code !== shipMethod.code
                                            );
                                        })
                                    );
                                }
                            }}
                            demension={{
                                width: widthDebounce,
                                height: heightDebounce,
                                long: longDebounce,
                            }}
                            weight={weightDebounce}
                            description={shipMethod.description}
                            name={shipMethod.name}
                            shipCode={shipMethod.code}
                            defaultValues={{
                                cost: shipMethod.cost,
                                isActive: shipMethod.isActive,
                            }}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

type DeliveryCostRowProps = {
    name: string;
    description: string;
    shipCode: ShipMethodCode;
    weight: number;
    demension: {
        width: number;
        long: number;
        height: number;
    };
    defaultValues?: {
        cost: number;
        isActive: boolean;
    };
    onChange?: (value: { cost: number; isActive: boolean }) => void;
};
const DeliveryCostRow: FC<DeliveryCostRowProps> = (props) => {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [cost, setCost] = useState<number>(props.defaultValues?.cost || 0);
    const [active, setActive] = useState<boolean>(
        !!props.defaultValues?.isActive
    );
    const [firstLoad, setFirstLoad] = useState(true);

    const [error, setError] = useState<string>();

    const getShippingCost = async () => {
        if (
            !props.shipCode ||
            !props.demension ||
            !props.demension.long ||
            !props.demension.width ||
            !props.demension.height ||
            !props.weight
        )
            return;

        setLoading(true);
        const response = await fetch(
            `/api/ship-methods/cost/${props.shipCode}?width=${props.demension.width}&height=${props.demension.height}&long=${props.demension.long}&weight=${props.weight}`,
            {
                cache: "no-store",
            }
        );
        const data = await response.json();
        if (data.error) {
            throw data.error;
        }
        setCost(data.cost);
        setLoading(false);
    };

    useEffect(() => {
        if (!props.demension || !props.weight || firstLoad) {
            setFirstLoad(false);
            return;
        }

        (async () => {
            try {
                setError(undefined);
                await getShippingCost();
            } catch (error: any) {
                setError(error);
                console.log({ error });
            }
        })();
    }, [
        props.demension.height,
        props.demension.width,
        props.demension.long,
        props.weight,
    ]);

    const handleChangeCost = (e: ChangeEvent<HTMLInputElement>) => {
        setCost(parseInt(e.target.value));
    };

    const handleBlurCost = () => {
        props.onChange?.({
            isActive: active,
            cost: cost,
        });
        setShowInput(false);
    };

    const handleActiveShipMethod = (checked: boolean) => {
        props.onChange?.({
            isActive: checked,
            cost: cost,
        });
        setActive(checked);
    };

    if (error)
        return (
            <p className="text-sm text-rose-600">
                đã có lỗi xảy ra {JSON.stringify(error)}
            </p>
        );

    return (
        <TableRow>
            <TableCell className="font-medium">{props.name}</TableCell>
            <TableCell className="text-muted-foreground md:max-w-[500px] text-pretty">
                {props.description}
            </TableCell>
            {!showInput && (
                <TableCell className="group font-medium flex w-full justify-between items-center">
                    <p>{fomatCurrency(cost || 0)}</p>

                    <Button
                        disabled={loading}
                        className={cn(
                            loading ? "invisible" : "visible",
                            " top-5 right-5"
                        )}
                        onClick={() => setShowInput(true)}
                        variant="ghost"
                    >
                        <Pen size={16}></Pen>
                    </Button>
                </TableCell>
            )}

            {showInput && (
                <TableCell className="group font-medium max-w-[140px]">
                    <Input
                        autoFocus
                        defaultValue={cost}
                        value={cost}
                        type="number"
                        placeholder={`Phí vận chuyển`}
                        onChange={handleChangeCost}
                        onBlur={handleBlurCost}
                    />
                </TableCell>
            )}

            <TableCell className="font-medium">
                <Switch
                    disabled={loading}
                    checked={active}
                    onCheckedChange={handleActiveShipMethod}
                />
            </TableCell>
        </TableRow>
    );
};

export default DeliveryCostTable;
