import * as z from "zod";

export const LoginSchema = z.object({
    email: z
        .string({
            required_error: "Vui lòng cho chúng tôi biết địa chỉ email của bạn",
        })
        .email({
            message: "Vui lòng nhập email đúng định đạng",
        }),
    password: z
        .string({
            required_error: "Mật khẩu không được bỏ trống",
        })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {
                message:
                    "Mật khẩu phải có ít nhất 8 kí tự, chữ cái in hoa, số, kí tự đặt biệt",
            }
        )
        .min(8, {
            message: "Mật khẩu phải tối thiểu 8 kí tự",
        }),
});

export const RegisterSchema = z
    .object({
        username: z
            .string({
                required_error: "Vui lòng không bỏ trống tên đăng nhập",
            })
            .min(5, {
                message: "Tên đăng nhập phải có ít nhất 5 kí tự",
            }),
        email: z
            .string({
                required_error:
                    "Vui lòng cho chúng tôi biết địa chỉ email của bạn",
            })
            .email({
                message: "Vui lòng nhập email đúng định đạng",
            }),
        password: z
            .string({
                required_error: "Mật khẩu không được bỏ trống",
            })
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                {
                    message:
                        "Mật khẩu phải có ít nhất 8 kí tự, chữ cái in hoa, số, kí tự đặt biệt",
                }
            )
            .min(8, {
                message: "Mật khẩu phải tối thiểu 8 kí tự",
            }),
        confirmPassword: z.string({
            required_error: "Xác nhận lại mật khẩu của bạn",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    });
