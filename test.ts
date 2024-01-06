import { sortObject, dateFormat } from "@/lib/utils";
import qs from "qs";
import crypto from "crypto";

type VnpConfig = {
    ipAddr: string;
    returnUrl: string;
    orderId: string;
    amount: number;
    bankCode?: string;
    orderDescription?: string;
};

export const createVnpLink = ({
    returnUrl,
    ipAddr,
    orderId,
    amount,
    bankCode,
    orderDescription,
}: VnpConfig) => {
    const date = new Date();
    const createDate = dateFormat(date);
    const tmnCode = process.env.VNPAY_TMNCODE!;
    const secretKey = process.env.VNPAY_SECRET!;
    let vnpUrl = process.env.VNPAY_URL!;

    const locale = "vn";
    const currCode = "VND";

    let vnp_Params = {} as any;

    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] =
        orderDescription || `Thanh toán cho giao dịch: ${orderId}`;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    // vnp_Params["vnp_IpnUrl"] = "http://localhost:3000/api/checkout/vnp_ipn";
    if (bankCode) {
        vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });

    return vnpUrl;
};
