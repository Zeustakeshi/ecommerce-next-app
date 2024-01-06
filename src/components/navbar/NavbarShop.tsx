"use client";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

type NavbarLink = {
    label: string;
    to: string;
};
const navbarLinks: NavbarLink[] = [
    {
        label: "Trang chủ",
        to: "/",
    },
    {
        label: "Tổng quan",
        to: "/manager/shop",
    },
    {
        label: "Giao diện",
        to: "/manager/shop/customize",
    },
    {
        label: "Sản phẩm",
        to: "/manager/shop/products",
    },
    {
        label: "Đơn hàng",
        to: "/manager/shop/orders",
    },
    {
        label: "Cài đặt",
        to: "/manager/shop/settings",
    },
];

const NavbarShop = () => {
    const pathname = usePathname();

    return (
        <nav className="w-full flex-1">
            {navbarLinks.map((link, index) => {
                return (
                    <Link
                        key={index}
                        href={link.to}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            pathname === link.to && "text-primary",
                            "text-lg"
                        )}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
};

export default NavbarShop;
