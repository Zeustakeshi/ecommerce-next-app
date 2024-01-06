import NextAuth from "next-auth";
import authConfigs from "./auth.configs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";
import CustomPrismaAdaper from "./lib/customPrismaAdapter";
import { UserRole } from "@prisma/client";
import { use } from "react";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/login",
    },
    adapter: CustomPrismaAdaper(db),
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await db.user.findUnique({
                where: {
                    id: user.id,
                },
            });

            // TODO : check verify email here
            if (!existingUser) return false;

            return true;
        },
        session({ session, token }) {
            if (session.user && token.user) {
                session.user = token.user as any;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const user = await db.user.findUnique({
                where: {
                    id: token.sub,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    profile: {
                        select: {
                            image: true,
                            addressDistrict: true,
                            addressProvince: true,
                            addressWard: true,
                            phone: true,
                            theme: true,
                        },
                    },
                    roles: {
                        select: {
                            role: true,
                        },
                    },
                    shop: {},
                },
            });
            if (!user) return token;

            token.user = {
                ...user,
                roles: user.roles.map((rote) => rote.role),
            };

            user.roles = user.roles.map((rote) => rote.role) as any;

            token.user = user;

            return token;
        },
    },
    ...authConfigs,
});
