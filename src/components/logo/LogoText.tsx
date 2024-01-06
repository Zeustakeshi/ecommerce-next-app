import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    to?: string;
};

const LogoText = (props: Props) => {
    if (props.to) {
        return (
            <Link
                href="/"
                className="flex min-w-min rounded-full p-2 flex-shrink-0 text-primary font-semibold text-2xl"
            >
                Tdmu eStore
            </Link>
        );
    }
    return (
        <div className="flex min-w-min rounded-full p-2 flex-shrink-0 text-primary font-semibold text-2xl">
            Tdmu eStore
        </div>
    );
};

export default LogoText;
