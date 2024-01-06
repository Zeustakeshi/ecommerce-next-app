import { auth } from "@/auth";
import ShopBanner from "@/components/banner/ShopBanner";
import ShopDescription from "@/components/info/ShopDescription";
import ShopName from "@/components/info/ShopName";
import db from "@/lib/db";
import { NotFoundException } from "@/lib/exception";
import { redirect } from "next/navigation";
import React from "react";

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
                        description: true,
                        phone: true,
                        theme: true,
                        images: {
                            select: {
                                imageUrl: true,
                            },
                        },
                    },
                },
            },
        });
    } catch (error) {
        throw error;
    }
};

const Customize = async () => {
    const session = await auth();
    if (!session?.user.id) redirect("/login");

    const shopInfo = await getShopInfo(session?.user.id);

    if (!shopInfo) throw new NotFoundException("Không tìm thấy cửa hàng này");

    const shopImages =
        shopInfo?.profile?.images?.map((image) => image.imageUrl) || [];

    return (
        <div className="space-y-5">
            <ShopBanner canEdit images={shopImages} />
            <section className="space-y-2">
                <ShopName
                    canEdit
                    defaultValue={shopInfo.name}
                    className="text-2xl font-semibold"
                />
                <ShopDescription
                    canEdit
                    defaultValue={shopInfo.profile?.description || ""}
                    className="text-lg text-muted-foreground w-full"
                />
            </section>
        </div>
    );
};

export default Customize;
