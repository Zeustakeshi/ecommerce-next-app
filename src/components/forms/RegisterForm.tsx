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
import { cn } from "@/lib/utils";
import { RegisterSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, MailCheck } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button, buttonVariants } from "../ui/button";
import { registerAction } from "@/actions/auth.action";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const RegisterForm = () => {
    const [isPending, setPending] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        setPending(true);
        registerAction(data).then((message) => {
            if (!message) return;
            setError(message.error);
            setSuccess(message.success);
            setPending(false);
        });
    };

    return (
        <Form {...form}>
            {error && (
                <Alert variant={"destructive"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Lỗi</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {success && (
                <Alert variant={"success"}>
                    <MailCheck className="w-4 h-4" />
                    <AlertTitle>Thành công</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên tài khoản</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="ví dụ: minhhieu"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="ví dụ: hieu@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <div className="relative flex justify-center items-center gap-1">
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="[0-9][a-z][A-z]@$*"
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className={cn("text-slate-500 px-3")}
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </Button>
                                </div>
                            </FormControl>

                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nhập lại mật khẩu</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="[0-9][a-z][A-z]@$*"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <div className="text-center text-sm text-muted-foreground !mt-6 ">
                    <p>Bằng việc đăng ký bạn đã đồng ý với dùng tôi về</p>
                    <Link
                        href="/terms-and-conditions"
                        className={cn(
                            buttonVariants({
                                variant: "link",
                            }),
                            "px-1 py-0"
                        )}
                    >
                        Điều khoản dịch vụ
                    </Link>
                    &
                    <Link
                        href="/terms-and-conditions"
                        className={cn(
                            buttonVariants({
                                variant: "link",
                            }),
                            "px-1 py-0"
                        )}
                    >
                        Chính sách bảo mật
                    </Link>
                </div>
                <Button disabled={isPending} type="submit" className="w-full">
                    {isPending ? "Đang tạo tài khoản ..." : " Tạo tài khoản"}
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
