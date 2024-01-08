import React, { ReactNode } from "react";

const CreateProductLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-muted-foreground">
                Tạo sản phẩm
            </h1>
            <div className="my-5 p-5">{children}</div>
        </div>
    );
};

export default CreateProductLayout;
