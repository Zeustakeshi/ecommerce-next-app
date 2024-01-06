import { Profile, ProfileTheme, Shop, UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            profile: {
                phone?: string;
                addressProvince?: string;
                addressDistrict?: string;
                addressWard?: string;
                image?: string;
                theme: ProfileTheme;
            };
            roles: UserRole[];
            shop?: Shop;
        } & DefaultSession["user"];
    }
}
