"use client";
import { saveProductSalesInfoAction } from "@/actions/product.action";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductSalesInfoSchema } from "@/schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
    productId: string;
    defaultValues?: {
        price?: number;
        inventory?: number;
    };
};

const SalesForm: FC<Props> = ({ defaultValues, productId }) => {
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [savingDraft, setSaveDraft] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);

    const form = useForm<z.infer<typeof ProductSalesInfoSchema>>({
        resolver: zodResolver(ProductSalesInfoSchema),
        defaultValues: defaultValues,
    });

    const router = useRouter();

    const goBack = async () => {
        const isValidData = await form.trigger();

        if (isValidData)
            router.replace(`/manager/shop/products/new/${productId}/more-info`);
    };

    const nextStep = async () => {
        const isValidData = await form.trigger();

        if (isValidData) {
            setSuccess(undefined);
            setError(undefined);
            setSaving(true);
            const message = await saveProductSalesInfoAction(
                form.getValues(),
                productId
            );
            if (message.success) {
                setSuccess(message.success);
                router.push(
                    `/manager/shop/products/new/${productId}/shipping-info`
                );
            } else if (message.error) setError(message.error);

            setSaving(false);
        }
    };
    const saveDraft = async () => {
        const isValidData = await form.trigger();
        if (isValidData) {
            setSuccess(undefined);
            setError(undefined);
            setSaveDraft(true);
            const message = await saveProductSalesInfoAction(
                form.getValues(),
                productId
            );
            if (message.success) setSuccess(message.success);
            else if (message.error) setError(message.error);
            setSaveDraft(false);
        }
    };

    return (
        <div>
            <Form {...form}>
                <div className="space-y-5">
                    {error && <Alert variant="destructive">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Giá:</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Giá sản phẩm"
                                            {...field}
                                            onChange={(e) =>
                                                form.setValue(
                                                    "price",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        ></Input>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="inventory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kho hàng:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Sản phẩm trong kho"
                                            {...field}
                                            onChange={(e) =>
                                                form.setValue(
                                                    "inventory",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            type="number"
                                        ></Input>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </Form>
            <div className="mt-8 flex justify-between items-center">
                <Button onClick={goBack} variant="secondary">
                    Quay lại
                </Button>
                <div className="flex justify-end items-center gap-5">
                    <Button
                        disabled={savingDraft}
                        onClick={saveDraft}
                        variant="secondary"
                    >
                        {savingDraft ? "Đang lưu" : "Lưu nháp"}
                    </Button>
                    <Button disabled={saving} onClick={nextStep}>
                        {saving ? "Đang lưu" : "Tiếp"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SalesForm;
