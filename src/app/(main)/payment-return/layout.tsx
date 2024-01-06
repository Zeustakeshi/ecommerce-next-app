import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <MaxWidthWrapper className="p-5 flex justify-center items-center">
            {children}
        </MaxWidthWrapper>
    );
};

export default layout;
