import prisma from "@/lib/db";

export const GET = async () => {
    const user = await prisma.user.findMany({
        include: {
            profile: {},
            roles: {},
            shop: {},
        },
    });

    return new Response(JSON.stringify(user), { status: 200 });
};
