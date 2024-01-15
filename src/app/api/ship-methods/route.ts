import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const shipMethod = await db.shipMethod.findMany();
        return NextResponse.json(shipMethod);
    } catch (error) {
        NextResponse.json(error);
    }
};
