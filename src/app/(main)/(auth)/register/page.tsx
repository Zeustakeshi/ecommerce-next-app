import ButtonLoginWithGoogle from "@/components/buttons/ButtonLoginWithGoogle";
import RegisterForm from "@/components/forms/RegisterForm";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Chrome, Facebook } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Tạo tài khoản",
};

const Register = () => {
    return (
        <div>
            <h1 className="text-center text-2xl md:text-3xl font-semibold text-slate-500">
                Tạo tài khoản
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
            <RegisterForm></RegisterForm>
            <div className="mt-4 mb-8 text-sm flex justify-center items-center gap-1 w-full">
                <span className="text-muted-foreground">
                    Bạn đã là thành viên
                </span>
                <Link
                    href="/login"
                    className={cn(
                        buttonVariants({
                            variant: "link",
                        }),
                        "px-1"
                    )}
                >
                    Đăng nhập ngay
                </Link>
            </div>
        </div>
    );
};

export default Register;
