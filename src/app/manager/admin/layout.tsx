import { auth } from "@/auth";
import ActiveLink from "@/components/navbar/ActiveLink";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Box, ShoppingCart, User2Icon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type AdminNavItem = {
    icon: ReactNode;
    label: string;
    to: string;
};

const adminNavItems: AdminNavItem[] = [
    {
        icon: <ShoppingCart></ShoppingCart>,
        label: "Cửa hàng",
        to: "/manager/admin/shops",
    },
    {
        label: "Sản phẩm",
        to: "/manager/admin/products/pending",
        icon: <Box />,
    },
    {
        label: "Tài khoản",
        to: "/manager/admin/accounts",
        icon: <User2Icon />,
    },
];

const AdminLayout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();
    const adminEmail = process.env.ADMIN_EMAIL!;
    if (!session?.user) redirect("/login");

    if (
        !session.user.roles.includes("ADMIN") ||
        !session?.user.email ||
        session.user.email !== adminEmail
    ) {
        redirect("/");
    }

    return (
        <div className="w-full h-svh grid grid-cols-12 gap-5 p-5 bg-slate-50">
            <nav className="col-span-2  shadow-[rgba(149,157,165,0.2)_0px_8px_24px] rounded-2xl overflow-hidden h-full bg-white bg-opacity-80 backdrop-blur-sm space-y-2 p-5">
                {adminNavItems.map((item, index) => {
                    return (
                        <ActiveLink
                            key={index}
                            href={item.to}
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                "px-5 py-4 w-full flex justify-start items-center gap-5 rounded-xl hover:text-primary"
                            )}
                            activeClassName={buttonVariants({
                                variant: "default",
                            })}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </ActiveLink>
                    );
                })}
            </nav>
            <div className="col-span-10 shadow-[rgba(149,157,165,0.2)_0px_8px_24px] rounded-2xl overflow-hidden h-full bg-white p-5">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
