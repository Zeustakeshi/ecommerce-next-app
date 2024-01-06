import { auth } from "@/auth";
import { Menu, User } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "../wrappers/MaxWidthWrapper";
import LogoText from "../logo/LogoText";
import NavbarMobile from "../navbar/NavbarMobile";
import Notification from "../notification/Notification";
import Search from "../search/Search";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";

import ProfileMenuMobile from "./profile/ProfileMenuMobile";

const HeaderMobile = async () => {
    const session = await auth();
    return (
        <MaxWidthWrapper className="block lg:hidden">
            <header className="relative  w-full px-3 py-4 flex justify-between items-center gap-2">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <LogoText></LogoText>
                        </SheetHeader>
                        <Separator></Separator>
                        <NavbarMobile></NavbarMobile>
                    </SheetContent>
                </Sheet>
                <Search></Search>
                <div className="flex justify-end items-center gap-5">
                    {session?.user ? (
                        <>
                            <Notification></Notification>
                            <ProfileMenuMobile></ProfileMenuMobile>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost">
                                    <User></User>
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </header>
        </MaxWidthWrapper>
    );
};

export default HeaderMobile;
