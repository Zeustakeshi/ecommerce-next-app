import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { nextUrl } = req;
    return NextResponse.json(nextUrl);
};
