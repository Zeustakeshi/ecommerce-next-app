"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Chrome } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const ButtonLoginWithGoogle = () => {
    const handleOauthWithGoogle = async () => {
        await signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    };

    return (
        <Button
            onClick={handleOauthWithGoogle}
            variant="secondary"
            className="flex-1 flex justify-center items-center gap-5"
        >
            <Chrome />
            Tiếp tục với google
        </Button>
    );
};

export default ButtonLoginWithGoogle;
