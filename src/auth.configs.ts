import { NextAuthConfig } from "next-auth";
import Credential from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas/auth.schema";
import * as bcrypt from "bcryptjs";
import db from "./lib/db";
export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credential({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (!validatedFields.success) return null;

                const { email, password } = validatedFields.data;

                const user = await db.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (!user || !user.password) return null;

                const isValidPassword = bcrypt.compareSync(
                    password,
                    user.password
                );

                if (!isValidPassword) return null;

                return user;
            },
        }),
    ],
} satisfies NextAuthConfig;
