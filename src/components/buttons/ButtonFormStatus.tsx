"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    label: string;
    pendingLabel: string;
};

const ButtonFormStatus = (props: Props) => {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            aria-disabled={pending}
            disabled={pending}
            className={cn(props.className)}
        >
            {pending ? props.pendingLabel : props.label}
        </Button>
    );
};

export default ButtonFormStatus;
