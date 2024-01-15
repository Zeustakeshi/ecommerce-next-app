"use client";
import { updateShopNameAction } from "@/actions/update.action";
import { cn } from "@/lib/utils";
import { UpdateShopNameSchema } from "@/schemas/update.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert } from "../ui/alert";
import { Button, buttonVariants } from "../ui/button";
import {
    Dialog,
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

type Props = {
    defaultValue: string;
    canEdit?: boolean;
    className?: string;
    wrapperClassName?: string;
};

const ShopName = (props: Props) => {
    const [updating, setUpdating] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();

    const form = useForm<z.infer<typeof UpdateShopNameSchema>>({
        resolver: zodResolver(UpdateShopNameSchema),
        defaultValues: {
            name: props.defaultValue,
        },
    });

    const onSubmit = async (value: z.infer<typeof UpdateShopNameSchema>) => {
        if (value.name.trim() === props.defaultValue) {
            setSuccess("Không có thay đổi gì");
            return;
        }
        setUpdating(true);
        const message = await updateShopNameAction(value);
        setError(undefined);
        setSuccess(undefined);
        if (message?.error) setError(message.error);
        if (message?.success) {
            setSuccess(message.success);
            form.reset(value);
        }
        setUpdating(false);
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
                        <DialogTitle>Chỉnh sửa tên cửa hàng</DialogTitle>
                    </DialogHeader>
                    {error && <Alert variant="destructive">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập tên cửa hàng của bạn"
                                                {...field}
                                            />
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

export default ShopName;
