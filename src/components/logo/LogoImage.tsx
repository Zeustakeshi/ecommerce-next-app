import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    to?: string;
    size?: number;
};

const LogoImage = (props: Props = { size: 60 }) => {
    if (props.to) {
        return (
            <Link
                href="/"
                className="flex min-w-min rounded-full p-2 flex-shrink-0"
            >
                <Image
                    src="/logo.png"
                    alt="logo"
                    className="w-full h-full object-cover"
                    width={props.size}
                    height={props.size}
                />
            </Link>
        );
    }
    return (
        <div className="flex min-w-min rounded-full p-2 flex-shrink-0">
            <Image
                src="/logo.png"
                alt="logo"
                className="w-full h-full object-cover"
                width={props.size}
                height={props.size}
            />
        </div>
    );
};

export default LogoImage;
