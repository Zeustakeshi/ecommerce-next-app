import LoginForm from "@/components/forms/LoginForm";
import ButtonLoginWithGoogle from "@/components/buttons/ButtonLoginWithGoogle";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Chrome, Facebook } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Đăng nhập",
};

const Login = () => {
    return (
        <div>
            <h1 className="text-center text-2xl md:text-3xl font-semibold text-slate-500">
                Đăng nhập
            </h1>
            <div className="flex justify-center items-center gap-5 flex-wrap w-full my-6 text-muted-foreground">
                <ButtonLoginWithGoogle></ButtonLoginWithGoogle>
                <Button
                    variant="secondary"
                    className="flex-1 flex justify-center items-center gap-5"
                >
                    <Facebook />
                    Tiếp tục với facebook
                </Button>
            </div>
            <div className="flex w-full max-w-full justify-center items-center gap-3 my-5 md:my-6">
                <span className="border-t border-border flex-1"></span>
                <span className="text-muted-foreground text-sm">Hoặc</span>
                <span className="border-t border-border flex-1"></span>
            </div>
            <LoginForm></LoginForm>
            <div className="mt-4 mb-8 text-sm flex justify-center items-center gap-1 w-full">
                <span className="text-muted-foreground">
                    Bạn chưa có tài khoản?
                </span>
                <Link
                    href="/register"
                    className={cn(
                        buttonVariants({
                            variant: "link",
                        }),
                        "px-1"
                    )}
                >
                    Tạo tài khoản mới
                </Link>
            </div>
        </div>
    );
};

export default Login;
