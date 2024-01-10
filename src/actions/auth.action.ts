"use server";

import * as bcrypt from "bcryptjs";
import db from "@/lib/db";
import { LoginSchema, RegisterSchema } from "@/schemas/auth.schema";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const loginAction = async (value: z.infer<typeof LoginSchema>) => {
    const validatedField = LoginSchema.safeParse(value);

    if (!validatedField.success) {
        return { error: "thông tin đăng nhập không hợp lệ" };
    }

    const { email, password } = validatedField.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });

        return { success: "Đăng nhập thành công" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Thông tin đăng nhập không hợp lệ" };
                default:
                    return {
                        error: "Đăng nhập không thành công vui lòng thử lại sau",
                    };
            }
        }
        throw error;
    }
};

export const registerAction = async (value: z.infer<typeof RegisterSchema>) => {
    const validatedField = RegisterSchema.safeParse(value);

    if (!validatedField.success) {
        return { error: "Thông tin đăng ký không hợp lệ" };
    }

    const { username, email, password } = validatedField.data;

    const existingUser = await db.user.findUnique({
        where: {
            email: email,
        },
    });

    if (existingUser) {
        return { error: "Địa chỉ email đã tồn tại" };
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    await db.user.create({
        data: {
            email,
            name: username,
            password: hashPassword,
        },
    });

    // TODO : Send verify email here
    return { success: "Email xác nhận đã được giửi vui lòng kiểm tra hòm thư" };
};
