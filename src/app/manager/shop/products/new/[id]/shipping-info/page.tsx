import ShippingForm from "@/components/forms/product/ShippingForm";
import React from "react";

const ProductShipInfo = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold text-muted-foreground">
                4. Thông tin vận chuyện
            </h2>
            <div className="mt-5 p-5">
                <ShippingForm></ShippingForm>
            </div>
        </div>
    );
};

export default ProductShipInfo;
