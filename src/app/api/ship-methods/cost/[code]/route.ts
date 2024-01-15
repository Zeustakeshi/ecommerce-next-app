import shipAdapter from "@/adapters/ship.adapter";
import {
    ProductDimensionSchema,
    ProductWeightAfterPackagingSchema,
} from "@/schemas/product.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: any }) => {
    const searchParams = req.nextUrl.searchParams;

    const validatedDemension = ProductDimensionSchema.safeParse({
        width: parseFloat(searchParams.get("width") as string),
        height: parseFloat(searchParams.get("height") as string),
        long: parseFloat(searchParams.get("long") as string),
    });

    const code = params.code;

    if (!validatedDemension.success) {
        return NextResponse.json(
            {
                message: "Invalid product demension",
                error: validatedDemension.error.flatten(),
            },
            {
                status: 400,
            }
        );
    }
    const validatedWeightAfterPackaging =
        ProductWeightAfterPackagingSchema.safeParse(
            parseFloat(searchParams.get("weight") as string)
        );

    if (!validatedWeightAfterPackaging.success) {
        return NextResponse.json(
            {
                message: "Invalid product weight",
                error: validatedWeightAfterPackaging.error.flatten(),
            },
            {
                status: 400,
            }
        );
    }

    const { height, long, width } = validatedDemension.data;
    const weight = validatedWeightAfterPackaging.data;

    try {
        const shipCost = await shipAdapter
            .getShipMethod(code)
            .getShippingCost(weight, {
                height,
                width,
                long,
            });
        return NextResponse.json({
            cost: shipCost,
        });
    } catch (error: any) {
        console.log({ error });
        return NextResponse.json(
            {
                message: error,
                error: error,
            },
            { status: 500 }
        );
    }
};
