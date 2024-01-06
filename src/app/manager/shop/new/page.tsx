import { auth } from "@/auth";
import NewShopForm from "@/components/forms/newShop/NewShopForm";
import { redirect } from "next/navigation";

const NewShop = async () => {
    const session = await auth();
    if (session?.user.shop || session?.user.roles.includes("SHOP"))
        redirect("/manager/shop");

    return (
        <div className="w-full flex-col justify-start items-start gap-8">
            <h1 className="text-3xl text-slate-600 font-bold">
                Bắt đầu kinh doanh
            </h1>
            <div>
                <NewShopForm></NewShopForm>
            </div>
        </div>
    );
};

export default NewShop;
