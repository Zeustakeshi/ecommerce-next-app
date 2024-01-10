import { auth } from "@/auth";
import SalesForm from "@/components/forms/product/SalesForm";
import { findProductById } from "@/lib/productUtils";
import { redirect } from "next/navigation";

const ProductSalesInfo = async ({ params }: { params: any }) => {
    const session = await auth();
    if (!session?.user.id) redirect("/login");

    const productId = params.id as string;
    let product = await findProductById(productId, {
        shopId: true,
        detail: {
            select: {
                price: true,
                inventory: true,
            },
        },
    });

    if (!product || product.shopId !== session.user.id) {
        redirect("/manager/shop/products");
    }
    return (
        <div>
            <h2 className="text-lg font-semibold text-muted-foreground">
                3. Thông tin bán hàng
            </h2>
            <div className="mt-5 p-5">
                <SalesForm
                    productId={product.id}
                    defaultValues={{
                        inventory: product.detail?.inventory || undefined,
                        price: (product.detail?.price as any) || undefined,
                    }}
                ></SalesForm>
            </div>
        </div>
    );
};

export default ProductSalesInfo;
