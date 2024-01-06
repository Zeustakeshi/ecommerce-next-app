"use client";
import { updateShopDescriptionAction } from "@/actions/update.action";
import { cn } from "@/lib/utils";
import {
    UpdateShopDescription,
    UpdateShopNameSchema,
} from "@/schemas/update.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert } from "../ui/alert";
import { Button, buttonVariants } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Props = {
    defaultValue: string;
    canEdit?: boolean;
    className?: string;
    wrapperClassName?: string;
};

const ShopDescription = (props: Props) => {
    const [updating, startUpdate] = useTransition();
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();

    const form = useForm<z.infer<typeof UpdateShopDescription>>({
        resolver: zodResolver(UpdateShopDescription),
        defaultValues: {
            description: props.defaultValue,
        },
    });

    const onSubmit = async (value: z.infer<typeof UpdateShopDescription>) => {
        if (value.description.trim() === props.defaultValue) {
            setSuccess("Không có thay đổi gì");
            return;
        }
        startUpdate(async () => {
            const message = await updateShopDescriptionAction(value);
            setError(undefined);
            setSuccess(undefined);
            if (message?.error) setError(message.error);
            if (message?.success) {
                setSuccess(message.success);
                form.reset(value);
            }
        });
    };

    if (!props.canEdit)
        return <h4 className={cn(props.className)}>{props.defaultValue}</h4>;

    return (
        <div className={cn(props.wrapperClassName)}>
            <Dialog>
                <DialogTrigger>
                    <div className="flex gap-2 items-center">
                        <h4 className={cn(props.className)}>
                            {props.defaultValue}
                        </h4>
                        <span
                            className={cn(buttonVariants({ variant: "ghost" }))}
                        >
                            <Edit size={20}></Edit>
                        </span>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className="">
                        <DialogTitle>Chỉnh sửa mô tả cửa hàng</DialogTitle>
                    </DialogHeader>
                    {error && <Alert variant="destructive">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                className="min-h-[300px]"
                                                placeholder="Nhập mô tả cửa hàng của bạn"
                                                {...field}
                                            ></Textarea>
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className="mt-5">
                                <Button disabled={updating}>
                                    {updating ? "Đang cập nhật" : "Chỉnh sửa"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ShopDescription;
