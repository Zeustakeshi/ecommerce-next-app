import { User } from "lucide-react";
import MaxWidthWrapper from "../wrappers/MaxWidthWrapper";
import LogoText from "../logo/LogoText";
import NavbarShop from "../navbar/NavbarShop";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { auth } from "@/auth";

const HeaderShop = async () => {
    const session = await auth();
    return (
        <div className="bg-white sticky top-0 z-50 inset-0  shadow-sm backdrop-blur bg-opacity-50 w-full backdrop:blur-0">
            <MaxWidthWrapper>
                <header className="relative w-full flex justify-between items-center p-2">
                    <div className="flex flex-1 flex-shrink-0 justify-start items-center gap-5">
                        <LogoText to="/"></LogoText>
                        <NavbarShop></NavbarShop>
                    </div>
                    {session?.user && session.user.shop && (
                        <div className="flex justify-end items-center gap-4">
                            <h2 className="text-lg">
                                {session?.user?.shop?.name ||
                                    `${session.user.name} (shop)`}
                            </h2>
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src={session?.user?.profile?.image || ""}
                                />
                                <AvatarFallback>
                                    <User></User>
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    )}
                </header>
            </MaxWidthWrapper>
        </div>
    );
};

export default HeaderShop;
