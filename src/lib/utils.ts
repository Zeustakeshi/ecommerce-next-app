import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import crypto from "crypto";

export const nanoid = customAlphabet("1234567890abcdef", 15);

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function to2DigitNumber(number: number) {
    if (isNaN(number)) {
        throw new Error("to2DigitNumber:param must be a number");
    }
    if (!number) {
        return "00";
    }

    return `0${number}`.substr(-2, 2);
}

export function dateFormat(date: Date) {
    if (date.constructor.name !== "Date") {
        throw new Error("vnPayDateFormat:param must be a date");
    }

    let result = "";
    result += date.getFullYear().toString();
    result += to2DigitNumber(date.getMonth() + 1);
    result += to2DigitNumber(date.getDate());
    result += to2DigitNumber(date.getHours());
    result += to2DigitNumber(date.getMinutes());
    result += to2DigitNumber(date.getSeconds());

    return result;
}

export function sortObject(obj: any) {
    let sorted = {} as any;
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            "+"
        );
    }
    return sorted;
}

export const generateSignature = (
    data: Record<any, any>,
    secretKey: string
): string => {
    // Sắp xếp các khóa trong đối tượng data theo thứ tự alphabetic
    const sortedData = Object.fromEntries(Object.entries(data).sort());

    // Tạo chuỗi rawSignature từ các giá trị trong đối tượng đã sắp xếp
    let rawSignature = "";
    for (let key in sortedData) {
        rawSignature += `${key}=${sortedData[key]}&`;
    }

    console.log({ rawSignature });

    rawSignature = rawSignature.slice(0, -1);
    // Thực hiện tạo chữ ký bằng thuật toán sha256 và secretKey
    const signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");

    return signature;
};
