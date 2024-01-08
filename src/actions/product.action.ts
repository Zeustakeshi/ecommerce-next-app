"use server";
import db from "@/lib/db";
import { ProductBasicInfoSchema } from "@/schemas/product.schema";
import * as z from "zod";

export const saveBasicInfoAction = async (
    data: z.infer<typeof ProductBasicInfoSchema>
) => {
    const productIndfoValidate = ProductBasicInfoSchema.safeParse(data);

    if (!productIndfoValidate.success) {
        return { error: "Thông tin sản phẩm không hợp lệ" };
    }

    const { category, description, name } = productIndfoValidate.data;

    try {
        const product = await db.product.findUnique({
            where: { id: data.id },
            select: {
                images: true,
            },
        });

        if (!product) return { error: "Mã sản phẩm không hợp lệ!" };

        if (product.images.length < 3) {
            return { error: "Sản phẩm phải có ít nhất 3 ảnh" };
        }

        await db.product.update({
            where: {
                id: data.id,
            },
            data: {
                categoryName: category,
                name: name,
                description: description,
            },
        });

        return { success: "Lưu thông tin thành công" };
    } catch (error: any) {
        console.log({ error });
        return { error: `Đã có lỗi xảy ra vui lòng thử lại sau` };
    }
};
