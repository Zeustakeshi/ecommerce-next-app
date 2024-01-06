import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const db =
    globalThis.prisma ||
    new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
        log: ["info"],
    });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;
