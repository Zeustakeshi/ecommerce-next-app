import * as z from "zod";

export const UpdateShopNameSchema = z.object({
    name: z
        .string({
            required_error: "tên cửa hàng không được bỏ trống",
        })
        .min(5),
});
export const UpdateShopDescription = z.object({
    description: z
        .string({
            required_error: "mô tả cửa hàng không được bỏ trống",
        })
        .min(5)
        .max(500, {
            message: "Mô tả của bạn quá dài",
        }),
});
