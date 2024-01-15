"use client";
import { saveBasicInfoAction } from "@/actions/product.action";
import { uploadProductImageAction } from "@/actions/upload.action";
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
import { Textarea } from "@/components/ui/textarea";
import UploadImageWrapper from "@/components/wrappers/UploadImageWrapper";
import { ProductBasicInfoSchema } from "@/schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputCategory from "../InputCategory";
import { useRouter } from "next/navigation";

type Props = {
    productId: string;
    defaultValues?: {
        name?: string;
        category?: string;
        images?: string[];
        description?: string;
    };
};

const BasicForm = (props: Props) => {
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [savingDraft, setSavingDraft] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof ProductBasicInfoSchema>>({
        resolver: zodResolver(ProductBasicInfoSchema),
        defaultValues: props.defaultValues,
    });

    const handleSaveAndNextStep = async () => {
        const isValidData = await form.trigger(
            ["category", "description", "name"],
            {
                shouldFocus: true,
            }
        );
        if (!isValidData) return;

        setError(undefined);
        setSuccess(undefined);
        if (!props.productId) return;

        setSaving(true);
        const message = await saveBasicInfoAction(
            form.getValues(),
            props.productId
        );
        if (message.error) setError(message.error);
        if (message.success) {
            router.push(
                `/manager/shop/products/new/${props.productId}/more-info`
            );
            setSuccess(message.success);
        }
        setSaving(false);
    };

    const handleSaveDraft = async () => {
        const isValidData = await form.trigger(
            ["category", "description", "name"],
            {
                shouldFocus: true,
            }
        );
        if (!isValidData) return;
        setError(undefined);
        setSuccess(undefined);
        if (!props.productId) return;
        setSavingDraft(true);
        const message = await saveBasicInfoAction(
            form.getValues(),
            props.productId
        );
        if (message.error) setError(message.error);
        if (message.success) setSuccess(message.success);
        setSavingDraft(false);
    };
    return (
        <Form {...form}>
            <div className="space-y-5">
                {error && <Alert variant="destructive">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-muted-foreground">
                                Tên sản phẩm
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="tên sản phẩm" {...field} />
                            </FormControl>
                            <FormDescription>
                                Tên sản phẩm nên đặt theo công thức: Tên sản
                                phẩm = Loại sản phẩm + Thương hiệu + Tên/Mã sản
                                phẩm + Mô tả sản phẩm
                            </FormDescription>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-muted-foreground">
                                Ngành hàng:
                            </FormLabel>
                            <FormControl>
                                <InputCategory
                                    category={field.value}
                                    onChange={(category) => {
                                        form.setValue("category", category);
                                    }}
                                    className="ml-5"
                                ></InputCategory>
                            </FormControl>

                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-muted-foreground">
                                Mô tả sản phẩm
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="min-h-[150px]"
                                    placeholder="Mô tả"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <div>
                    <FormLabel className="text-muted-foreground">
                        Ảnh sản phẩm
                    </FormLabel>
                    <div className="h-auto min-h-[200px] w-full border grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 p-4">
                        {props.defaultValues?.images?.map((url, index) => {
                            return (
                                <div className="h-full" key={index}>
                                    <img
                                        src={url}
                                        alt={`product-image-${index + 1}`}
                                        className="w-full h-full object-contain object-center"
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <UploadImageWrapper
                        uploadHandler={uploadProductImageAction}
                        uploadPayload={{
                            productId: props.productId,
                        }}
                        maxImage={5}
                        minImage={3}
                        multiple
                        className="block my-3"
                    >
                        <Button type="button" variant="secondary">
                            Thêm ảnh
                        </Button>
                    </UploadImageWrapper>
                </div>
                <div className="flex justify-end items-center gap-5">
                    <Button
                        disabled={savingDraft}
                        variant="secondary"
                        type="submit"
                        onClick={handleSaveDraft}
                    >
                        {savingDraft ? "Đang lưu" : "Lưu nháp"}
                    </Button>
                    <Button
                        onClick={handleSaveAndNextStep}
                        disabled={saving}
                        type="submit"
                    >
                        {saving ? "Đang lưu" : "Tiếp"}
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default BasicForm;
