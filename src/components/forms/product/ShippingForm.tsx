"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductShipInfoSchema } from "@/schemas/product.schema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DeliveryCostTable from "../../tables/DeliveryCostTable";
import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShipMethodCode } from "@prisma/client";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    completeCreateProductAction,
    saveProductSalesInfoAction,
    saveProductShipInfoAction,
} from "@/actions/product.action";
import { Alert } from "@/components/ui/alert";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
    productId: string;
    defaultValues?: {
        weightAfterPackaging?: number;
        dimensions?: {
            width?: number;
            height?: number;
            long?: number;
        };
        ship?: {
            code?: string;
            shipCost?: number;
        }[];
    };
};

const ShippingForm: FC<Props> = (props) => {
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [saving, setSaving] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const form = useForm<z.infer<typeof ProductShipInfoSchema>>({
        resolver: zodResolver(ProductShipInfoSchema),
        defaultValues: props.defaultValues,
    });

    const router = useRouter();

    const goBack = async () => {
        const isValidData = await form.trigger();

        if (isValidData) router.back();
    };

    const saveProduct = async () => {
        const isValidData = await form.trigger();

        if (isValidData) {
            setSuccess(undefined);
            setError(undefined);
            setSaving(true);
            const message = await saveProductShipInfoAction(
                form.getValues(),
                props.productId
            );
            if (message.success) {
                setSuccess(message.success);
                setOpenDialog(true);
            } else if (message.error) setError(message.error);

            setSaving(false);
        }
    };

    return (
        <Form {...form}>
            <div className="space-y-6">
                {error && <Alert variant="destructive">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <FormField
                    control={form.control}
                    name="weightAfterPackaging"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cân nặng gói hàng (gram)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Cân nặng sau đóng gói"
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                        form.setValue(
                                            "weightAfterPackaging",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    <FormField
                        control={form.control}
                        name="dimensions.width"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rộng (cm)</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Rộng"
                                        type="number"
                                        onChange={(e) =>
                                            form.setValue(
                                                "dimensions.width",
                                                parseFloat(e.target.value)
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dimensions.long"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dài (cm)</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Dài"
                                        type="number"
                                        onChange={(e) =>
                                            form.setValue(
                                                "dimensions.long",
                                                parseFloat(e.target.value)
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dimensions.height"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cao (cm)</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Cao"
                                        type="number"
                                        onChange={(e) =>
                                            form.setValue(
                                                "dimensions.height",
                                                parseFloat(e.target.value)
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <DeliveryCostTable
                    values={form.watch("ship").map((ship) => ({
                        code: ship.code as ShipMethodCode,
                        cost: ship.shipCost,
                    }))}
                    height={form.watch("dimensions.height")}
                    width={form.watch("dimensions.width")}
                    long={form.watch("dimensions.long")}
                    weight={form.watch("weightAfterPackaging")}
                    onChange={(values) => {
                        form.setValue(
                            "ship",
                            values.map(({ code, cost }) => ({
                                shipCost: cost,
                                code,
                            }))
                        );
                    }}
                />
            </div>
            <div className="mt-8 flex justify-between items-center">
                <Button onClick={goBack} variant="secondary">
                    Quay lại
                </Button>
                <div className="flex justify-end items-center gap-5">
                    <Button disabled={saving} onClick={saveProduct}>
                        {saving ? "Đang xử lý" : "Công khai"}
                    </Button>
                    <AlertDialog open={openDialog}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Thông báo</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Sản phẩm của đang được xét duyệt, hãy kiểm
                                    tra hòm thư của bạn thường xuyên chúng tôi
                                    sẽ gửi thông báo đến bạn trong thời gian sớm
                                    nhất
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>hủy</AlertDialogCancel>
                                <AlertDialogCancel
                                    className={buttonVariants({
                                        variant: "default",
                                    })}
                                    onClick={async () => {
                                        const message =
                                            await completeCreateProductAction(
                                                props.productId
                                            );

                                        if (message.success) {
                                            setSuccess(message.success);
                                            router.replace(
                                                "/manager/shop/products"
                                            );
                                        } else if (message.error) {
                                            setError(message.error);
                                        }
                                    }}
                                >
                                    Đồng ý
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </Form>
    );
};

export default ShippingForm;
