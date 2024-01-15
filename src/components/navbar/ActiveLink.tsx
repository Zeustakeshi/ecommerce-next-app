"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
    activeClassName?: string;
    href: string;
};

const ActiveLink: FC<Props> = (props) => {
    const pathName = usePathname();
    const isActive = pathName.match(props.href);
    return (
        <Link
            href={props.href}
            className={cn(isActive && props.activeClassName, props.className)}
        >
            {props.children}
        </Link>
    );
};

export default ActiveLink;
