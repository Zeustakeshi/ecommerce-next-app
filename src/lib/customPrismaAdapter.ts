import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./db";
import { Adapter } from "@auth/core/adapters";
import { UserRole } from "@prisma/client";
const CustomPrismaAdaper = (p: typeof db): Adapter => {
    return {
        ...PrismaAdapter(p),
        createUser(user) {
            const { email, emailVerified, image, name } = user;
            return p.user.create({
                data: {
                    name: name as string,
                    email,
                    emailVerified,
                    roles: {
                        create: {
                            role: UserRole.USER,
                        },
                    },
                    profile: {
                        create: {
                            image: image,
                        },
                    },
                },
            });
        },
    };
};

export default CustomPrismaAdaper;
