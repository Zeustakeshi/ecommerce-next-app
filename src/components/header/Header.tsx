import { auth } from "@/auth";
import Link from "next/link";
import MaxWidthWrapper from "../wrappers/MaxWidthWrapper";
import Cart from "../cart/Cart";
import LogoImage from "../logo/LogoImage";
import { Navbar } from "../navbar/Navbar";
import Notification from "../notification/Notification";
import Search from "../search/Search";
import { buttonVariants } from "../ui/button";
import ProfileMenu from "./profile/ProfileMenu";
import { FC, ReactNode } from "react";

const Header = async () => {
    const data = await auth();

    return (
        <MaxWidthWrapper className="hidden lg:block">
            <header className="relative w-full flex justify-between items-center p-2">
                <div className="flex flex-1 flex-shrink-0 justify-start items-center gap-5">
                    <LogoImage size={64} to="/" />
                    <Navbar></Navbar>
                </div>
                <div className="flex flex-1 justify-end items-center gap-2 flex-shrink-0">
                    {data?.user ? (
                        <>
                            <Search></Search>
                            <Cart></Cart>
                            <Notification></Notification>
                            <ProfileMenu></ProfileMenu>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={buttonVariants({ variant: "ghost" })}
                            >
                                Đăng nhập
                            </Link>
                            <span className="text-muted-foreground">|</span>

                            <Link
                                href="/register"
                                className={buttonVariants({ variant: "ghost" })}
                            >
                                Tạo tài khoản
                            </Link>
                            <span className="text-muted-foreground">|</span>
                            <Cart></Cart>
                        </>
                    )}
                </div>
            </header>
        </MaxWidthWrapper>
    );
};

export default Header;
