import e from "express";
import * as z from "zod";

const BaseProductSchema = z.object({
    name: z
        .string({
            invalid_type_error: "Tên sản phẩm không hợp lệ",
            required_error: "Tên sản phẩm không được bỏ trống",
        })
        .min(20, { message: "Tên sẩn phẩm phải có ít nhất 20 kí tự" })
        .max(255, { message: "Tên sản phẩm nên có tối đa 255 kí tự" }),
    description: z.string({
        invalid_type_error: "Mô tả sản phẩm không hợp lệ",
        required_error: "Mô tả sản phẩm là trường bắt buộc",
    }),
    price: z.optional(
        z.number().min(1000, { message: "Giá phải ít nhất 1000đ" })
    ),
    brand: z.optional(z.string()),
    origin: z.optional(z.string()),
    inventory: z.optional(
        z.number().min(1, {
            message: "Phải có ít nhất 1 sản phẩm trong kho",
        })
    ),
    isNew: z.optional(z.boolean().default(true)),
    weightAfterPackaging: z.optional(
        z
            .number()
            .min(0.1, {
                message: "Cân nặng phải lớn hơn 0.1g",
            })
            .max(30000, {
                message: "Cân nặng phải nhỏ hơn 30kg",
            })
            .refine((value) => !Number.isFinite(value) || !Number.isNaN(value))
    ),
    width: z.optional(
        z
            .number()
            .min(1, {
                message: "Chiều rộng phải lớn hơn 1cm",
            })
            .max(1000, {
                message: "Chiều rộng phải nhỏ hơn 10m",
            })
    ),
    height: z.optional(
        z
            .number()
            .min(1, {
                message: "Chiều cao phải lớn hơn 1cm",
            })
            .max(1000, {
                message: "Chiều cao phải nhỏ hơn 10m",
            })
    ),
    long: z.optional(
        z
            .number()
            .min(1, {
                message: "Chiều dài phải lớn hơn 1cm",
            })
            .max(1000, {
                message: "Chiều dài phải nhỏ hơn 10m",
            })
    ),
    ship: z.optional(
        z.object({
            shipMethod: z.string(),
            shippingCost: z.number().min(0),
        })
    ),
    categories: z.optional(
        z.object({
            level1: z.string(),
            level2: z.string(),
            level3: z.string(),
        })
    ),
});

export const ProductShipInfoSchema = z.object({
    weightAfterPackaging: z
        .number()
        .min(0.1, {
            message: "Cân nặng phải lớn hơn 0.1g",
        })
        .max(30000, {
            message: "Cân nặng phải nhỏ hơn 30kg",
        })
        .refine((value) => !Number.isFinite(value) || !Number.isNaN(value)),
    width: z
        .number()
        .min(1, {
            message: "Chiều rộng phải lớn hơn 1cm",
        })
        .max(1000, {
            message: "Chiều rộng phải nhỏ hơn 10m",
        }),
    height: z
        .number()
        .min(1, {
            message: "Chiều cao phải lớn hơn 1cm",
        })
        .max(1000, {
            message: "Chiều cao phải nhỏ hơn 10m",
        }),
    long: z
        .number()
        .min(1, {
            message: "Chiều dài phải lớn hơn 1cm",
        })
        .max(1000, {
            message: "Chiều dài phải nhỏ hơn 10m",
        }),
    ship: z.object({
        shipMethod: z.string(),
        shippingCost: z.number().min(0),
    }),
});

export const ProductSalesInfoSchema = z.object({
    price: z.number().min(1000, { message: "Giá phải ít nhất 1000đ" }),
    inventory: z.number().min(1, {
        message: "Phải có ít nhất 1 sản phẩm trong kho",
    }),
});

export const ProductDetailSchema = z.object({
    brand: z.optional(z.string()),
    origin: z.optional(z.string()),
    isNew: z.optional(z.boolean().default(true)),
});

export const ProductBasicInfoSchema = z.object({
    id: z.string(),
    name: z
        .string({
            invalid_type_error: "Tên sản phẩm không hợp lệ",
            required_error: "Tên sản phẩm không được bỏ trống",
        })
        .min(20, { message: "Tên sẩn phẩm phải có ít nhất 20 kí tự" })
        .max(255, { message: "Tên sản phẩm nên có tối đa 255 kí tự" }),
    description: z
        .string({
            invalid_type_error: "Mô tả sản phẩm không hợp lệ",
            required_error: "Mô tả sản phẩm là trường bắt buộc",
        })
        .min(100, {
            message: "Mô tả sản phẩm phải có ít nhất 100 kí tự",
        })
        .max(5000, {
            message: "Mô tả sản phẩm tối đa 5000 kí tự",
        }),
    category: z.string({
        required_error: "Vui lòng chọn ngành hàng bạn muốn bán",
    }),
});
