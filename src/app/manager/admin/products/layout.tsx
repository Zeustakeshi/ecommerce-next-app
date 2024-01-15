import ActiveLink from "@/components/navbar/ActiveLink";
import { buttonVariants } from "@/components/ui/button";
import { headers } from "next/headers";
import { FC, ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full h-full space-y-5">
            <div className="w-full flex justify-center items-center">
                <TabItem to="/manager/admin/products/pending">
                    Chờ duyệt
                </TabItem>
                <TabItem to="/manager/admin/products/public">Đã duyệt</TabItem>
                <TabItem to="/manager/admin/products/rejected">Từ chối</TabItem>
            </div>
            <div>{children}</div>
        </div>
    );
};

type TabItemProps = {
    to: string;
    children: ReactNode;
};
const TabItem: FC<TabItemProps> = ({ to, children }) => {
    return (
        <ActiveLink
            href={to}
            className={buttonVariants({ variant: "ghost" })}
            activeClassName={buttonVariants({ variant: "default" })}
        >
            {children}
        </ActiveLink>
    );
};

export default layout;
