import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import HeaderShop from "@/components/header/HeaderShop";
import AppProvider from "@/context/AppProvider";

export default async function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppProvider>
            <div className="w-full">
                <HeaderShop></HeaderShop>
                <MaxWidthWrapper className="p-5">{children}</MaxWidthWrapper>
            </div>
        </AppProvider>
    );
}
