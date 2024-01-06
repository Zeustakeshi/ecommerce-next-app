import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    BellRing,
    Headphones,
    LogOut,
    Moon,
    Paintbrush2,
    Settings,
    ShoppingCart,
    Store,
    SunMedium,
    SunMoon,
    User,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type Props = {};

const ProfileMenu: FC<Props> = async () => {
    const session = await auth();
    if (!session) return <></>;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={session?.user?.profile?.image || ""} />
                    <AvatarFallback>
                        <User></User>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <DropdownMenuLabel className="font-normal">
                    <p className="text-lg font-semibold">
                        {session.user.name ? session.user.name : "Tài khoản"}
                    </p>
                    <span className="text-sm text-muted-foreground">
                        {session.user.email}
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link
                        href="/account"
                        className="w-full h-full cursor-pointer"
                    >
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Tài khoản</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link
                        href="/manager/shop"
                        className="w-full h-full cursor-pointer"
                    >
                        <DropdownMenuItem>
                            <Store className="mr-2 h-4 w-4" />
                            <span>Cửa hàng</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Paintbrush2 className="mr-2 h-4 w-4" />
                            <span>Giao diện</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>
                                <SunMedium className="mr-2 h-4 w-4" />
                                <span>Sáng</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Moon className="mr-2 h-4 w-4" />
                                <span>Tối</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <SunMoon className="mr-2 h-4 w-4" />
                                <span>Hệ thống</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <Link
                        href="/notification"
                        className="w-full h-full cursor-pointer"
                    >
                        <DropdownMenuItem>
                            <BellRing className="mr-2 h-4 w-4" />
                            <span>Thông báo</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link
                        href="/settings"
                        className="w-full h-full cursor-pointer"
                    >
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Cài đặt</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/cart" className="w-full h-full cursor-pointer">
                        <DropdownMenuItem>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            <span>Giỏ hàng</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link
                        href="/supports"
                        className="w-full h-full cursor-pointer"
                    >
                        <DropdownMenuItem>
                            <Headphones className="mr-2 h-4 w-4" />
                            <span>Hỗ trợ</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileMenu;
