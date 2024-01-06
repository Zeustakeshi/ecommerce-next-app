import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../ui/sheet";
import Link from "next/link";
import {
    BellRing,
    Headphones,
    LogOut,
    Settings,
    Store,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfileMenuMobile = async () => {
    const session = await auth();
    if (!session?.user) return <></>;

    return (
        <Sheet>
            <SheetTrigger>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={session?.user?.profile?.image || ""} />
                    <AvatarFallback>
                        <User></User>
                    </AvatarFallback>
                </Avatar>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <p className="text-lg font-semibold">
                            {session.user.name
                                ? session.user.name
                                : "Tài khoản"}
                        </p>
                        <span className="text-sm text-muted-foreground">
                            {session.user.email}
                        </span>
                    </SheetTitle>
                </SheetHeader>
                <Separator className="mt-2"></Separator>
                <div className="mt-5">
                    <Link
                        className="px-3 py-2 flex justify-start items-center"
                        href="/account"
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span>Tài khoản</span>
                    </Link>
                    <Link
                        className="px-3 py-2 flex justify-start items-center"
                        href="/store"
                    >
                        <Store className="mr-2 h-4 w-4" />
                        <span>Cửa hàng</span>
                    </Link>
                    <Link
                        className="px-3 py-2 flex justify-start items-center"
                        href="/notification"
                    >
                        <BellRing className="mr-2 h-4 w-4" />
                        <span>Thông báo</span>
                    </Link>
                    <Link
                        className="px-3 py-2 flex justify-start items-center"
                        href="/settings"
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Cài đặt</span>
                    </Link>

                    <Link
                        className="px-3 py-2 flex justify-start items-center"
                        href="/supports"
                    >
                        <Headphones className="mr-2 h-4 w-4" />
                        <span>Hỗ trợ</span>
                    </Link>
                    <Separator className="mt-2"></Separator>
                    <form
                        action={async () => {
                            "use server";
                            await signOut();
                        }}
                    >
                        <Button variant="ghost" type="submit">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Đăng xuất</span>
                        </Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ProfileMenuMobile;
