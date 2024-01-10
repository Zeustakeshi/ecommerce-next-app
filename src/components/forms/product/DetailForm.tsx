"use client";
import { saveProductDetailAction } from "@/actions/product.action";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductDetailSchema } from "@/schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { HelpCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
    ssr: false,
});

type Props = {
    defaultValues?: {
        moreDescription?: string;
        brand?: string;
        origin?: string;
        isNew?: boolean;
    };
    productId: string;
};

const ProductDetailForm: FC<Props> = ({ defaultValues, productId }) => {
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [savingDraft, startSaveDraft] = useTransition();
    const [saving, startSaving] = useTransition();

    const form = useForm<z.infer<typeof ProductDetailSchema>>({
        resolver: zodResolver(ProductDetailSchema),
        defaultValues: defaultValues,
    });

    const router = useRouter();

    const goBack = async () => {
        const isValidData = await form.trigger();
        if (isValidData) router.back();
    };
    const nextStep = async () => {
        const isValidData = await form.trigger();
        if (isValidData) {
            startSaving(async () => {
                setSuccess(undefined);
                setError(undefined);
                const message = await saveProductDetailAction(
                    form.getValues(),
                    productId
                );
                if (message.success) {
                    setSuccess(message.success);
                    router.push(
                        `/manager/shop/products/new/${productId}/sales-info`
                    );
                } else if (message.error) setError(message.error);
            });
        }
    };
    const saveDraft = async () => {
        const isValidData = await form.trigger();
        if (isValidData) {
            startSaveDraft(async () => {
                setSuccess(undefined);
                setError(undefined);
                const message = await saveProductDetailAction(
                    form.getValues(),
                    productId
                );
                if (message.success) setSuccess(message.success);
                else if (message.error) setError(message.error);
            });
        }
    };

    return (
        <div>
            <Form {...form}>
                <div className="space-y-5">
                    {error && <Alert variant="destructive">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên thương hiệu</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Tên thương hiệu"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="origin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nguồn gốc</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nguồn gốc"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="isNew"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tình trạng sản phẩm</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            if (value === "new")
                                                form.setValue("isNew", true);
                                            else if (value === "old")
                                                form.setValue("isNew", false);
                                        }}
                                        value={field.value ? "new" : "old"}
                                        defaultValue={
                                            field.value ? "new" : "old"
                                        }
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Tình trạng sản phẩm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">
                                                Sản phẩm mới
                                            </SelectItem>
                                            <SelectItem value="old">
                                                Đã qua sử dụng
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="moreDescription"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Mô tả chi tiết sản phẩm</FormLabel>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <p>
                                        Mô tả thật chi tiết sản phẩm của bạn để
                                        người dùng dễ dàng lựu chọn hơn nhé
                                    </p>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost">
                                                    <HelpCircle size={14} />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-muted-foreground max-w-[500px]">
                                                    <strong className="text-black">
                                                        Mẹo:{" "}
                                                    </strong>
                                                    Bạn có thể sử dụng trình
                                                    chỉnh sửa bên dưới để viết
                                                    mô tả sản phẩm, thêm bảng
                                                    kích thước sản phẩm, thêm
                                                    một số thông tin của sản
                                                    phẩm, .....
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                                <FormControl>
                                    <Editor
                                        initContent={field.value}
                                        onChange={(value) => {
                                            form.setValue(
                                                "moreDescription",
                                                value
                                            );
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
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

export default ProductDetailForm;
