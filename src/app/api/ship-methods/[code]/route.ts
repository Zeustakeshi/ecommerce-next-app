import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: any }) => {
    const code = params.code;
    if (!code) return NextResponse.json("Ship code not found!");

    try {
        const ship = await db.shipMethod.findUnique({
            where: { code: code },
        });

        return NextResponse.json(ship);
    } catch (error: any) {
        return NextResponse.json("Something went wrong!");
    }
};
