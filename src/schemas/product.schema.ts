import { fomatCurrency } from "@/lib/utils";
import e from "express";
import * as z from "zod";

export const ProductDimensionSchema = z.object({
    width: z
        .number()
        .min(1, {
            message: "Chiều rộng phải lớn hơn 1cm",
        })
        .max(10000, {
            message: "Chiều rộng phải nhỏ hơn 10m",
        }),
    height: z
        .number()
        .min(1, {
            message: "Chiều cao phải lớn hơn 1cm",
        })
        .max(10000, {
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
});

export const ProductWeightAfterPackagingSchema = z
    .number()
    .min(0.1, {
        message: "Cân nặng phải lớn hơn 0.1g",
    })
    .max(30000, {
        message: "Cân nặng phải nhỏ hơn 30kg",
    })
    .refine((value) => !Number.isFinite(value) || !Number.isNaN(value));

export const ProductShipInfoSchema = z.object({
    weightAfterPackaging: ProductWeightAfterPackagingSchema,
    dimensions: ProductDimensionSchema,
    ship: z
        .array(
            z.object({
                code: z.string(),
                shipCost: z.number().min(0).max(10000000, {
                    message: "Phí vận chuyển không thể vượt quá 10tr",
                }),
            })
        )
        .min(1, {
            message: "Sản phẩm phải có ít nhất 1 phương thức vận chuyển",
        }),
});

export const ProductSalesInfoSchema = z.object({
    price: z
        .number({
            invalid_type_error: "Giá sản phẩm phải có kiểu dữ liệu số",
        })
        .min(1000, { message: "Giá phải ít nhất 1000đ" })
        .max(10000000, {
            message: `Chúng tôi hiện cho phép bán các sản phẩm có gía dưới ${fomatCurrency(
                10000000
            )}`,
        }),
    inventory: z
        .number({
            invalid_type_error: "Số lượng kho hàng phải có kiểu dữ liệu số",
        })
        .min(1, {
            message: "Phải có ít nhất 1 sản phẩm trong kho",
        })
        .max(50000, {
            message:
                "Số sản phẩm tối đa của bạn chỉ có thể  <= 50,000 sản phẩm",
        }),
});

export const ProductDetailSchema = z.object({
    brand: z.optional(z.string()),
    origin: z.optional(z.string()),
    isNew: z.optional(z.boolean().default(true)),
    moreDescription: z
        .string({
            required_error: "Đây là trường bắt buộc khi tạo sản phẩm",
        })
        .min(1000),
});

export const ProductBasicInfoSchema = z.object({
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
        .min(20, {
            message: "Mô tả sản phẩm phải có ít nhất 100 kí tự",
        })
        .max(1500, {
            message: "Mô tả sản phẩm tối đa 1500 kí tự",
        }),
    category: z.string({
        required_error: "Vui lòng chọn ngành hàng bạn muốn bán",
    }),
});

export const ProductSchema = z.object({
    basicInfo: ProductBasicInfoSchema,
    moreInfo: ProductDetailSchema,
    salesInfo: ProductSalesInfoSchema,
    shipInfo: ProductShipInfoSchema,
});
