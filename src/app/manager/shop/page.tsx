import { auth } from "@/auth";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import ShopAnalyticsOverview from "@/components/manage/ShopAnalyticsOverview";
import ShopOverview from "@/components/manage/ShopOverview";
import ShopTodo from "@/components/manage/ShopTodo";

import db from "@/lib/db";
import { RuntimeErrorException } from "@/lib/exception";
import { redirect } from "next/navigation";
const getShopInfo = async (shopId: string) => {
    try {
        return await db.shop.findUnique({
            where: {
                id: shopId,
            },
            select: {
                name: true,
                profile: {
                    select: {
                        addressDistrict: true,
                        addressProvince: true,
                        addressWard: true,
                        cardNumber: true,
                        phone: true,
                        theme: true,
                        description: true,
                    },
                },
            },
        });
    } catch (error: any) {
        throw new RuntimeErrorException(error.message);
    }
};

const ShopManager = async () => {
    const session = await auth();
    if (!session?.user?.shop || !session?.user?.roles?.includes("SHOP")) {
        redirect("/manager/shop/new");
    }

    return (
        <MaxWidthWrapper className="w-full h-full flex flex-col gap-5">
            <ShopTodo></ShopTodo>
            <ShopOverview></ShopOverview>
            <ShopAnalyticsOverview></ShopAnalyticsOverview>
        </MaxWidthWrapper>
    );
};

export default ShopManager;
