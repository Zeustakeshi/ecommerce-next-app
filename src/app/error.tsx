"use client";

import { Alert } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { Single_Day } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const singleDay = Single_Day({ weight: "400" });

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div
            className={cn(
                singleDay.className,
                "w-svw h-svh flex justify-center items-center flex-col gap-5"
            )}
        >
            <h1 className="text-4xl font-semibold my-5">Đã có lỗi xảy ra</h1>
            <Image
                width={500}
                height={500}
                src="/error.svg"
                alt="notfound"
                style={{ objectFit: "cover" }}
            ></Image>
            <Alert
                variant="destructive"
                className="sm:max-w-[60svw] max-w-[90svw] flex justify-start items-center gap-5"
            >
                <span>
                    <AlertTriangle />
                </span>
                <h2 className=" text-lg">
                    Error: {error.message || "Something went wrong!"}
                </h2>
            </Alert>
            <div className="flex justify-center items-center gap-5">
                <Button
                    variant="secondary"
                    onClick={() => reset()}
                    className="font-semibold text-lg"
                >
                    Thử lại
                </Button>
                <Link href="/" className="font-semibold text-lg text-primary">
                    Trang chủ
                </Link>
            </div>
        </div>
    );
}
