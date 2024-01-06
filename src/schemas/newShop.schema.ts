import * as z from "zod";

export const NewShopSchema = z.object({
    name: z.string({
        required_error: "Vui lòng đặt tên cửa hàng của bạn",
    }),

    address: z
        .object({
            province: z.string({
                required_error: "Vui lòng chọn tỉnh, thành phố",
            }),
            district: z.string({
                required_error: "Vui lòng chọn quận, huyện",
            }),
            ward: z.string({
                required_error: "Vui lòng chọn phường, xã, thị trấn",
            }),
        })
        .required({
            district: true,
            province: true,
            ward: true,
        }),
    phone: z.string().regex(/^(0|84)([3|5|7|8|9])+([0-9]{8})$/, {
        message: "Số điện thoại không hợp lệ",
    }),
    cardNumber: z.string({
        required_error: "Vui lòng cho biết số tài khoản của bạn",
    }),
    description: z
        .string({
            required_error: "Mô tả không được bỏ trống",
        })
        .min(20, {
            message: "Mô tả của bạn quá ngắn",
        })
        .max(500, {
            message: "Mô tả của bạn quá dài",
        }),
});
