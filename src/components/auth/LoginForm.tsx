"use client";
import { loginAction } from "@/actions/auth.action";
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
import { LoginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, MailCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startLogin] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        startLogin(() => {
            loginAction(data).then((message) => {
                if (message) {
                    setSuccess(message.success);
                    setError(message.error);
                }
            });
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

                <Button type="submit" className="w-full !mt-6">
                    {isPending ? "Đang đăng nhập ....." : "Đăng nhập"}
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
