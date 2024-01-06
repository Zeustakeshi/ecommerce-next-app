import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({ signature });
}
