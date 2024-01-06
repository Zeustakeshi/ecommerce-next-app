export class NotFoundException extends Error {
    constructor(mess?: string) {
        super(mess || "Not found");
    }
}

export class RuntimeErrorException extends Error {
    constructor(mess?: string) {
        super(mess || "Đã có lỗi xảy ra vui lòng thử lại sau :(");
    }
}

export class InternalServerError extends Error {
    constructor(mess?: string) {
        super(mess || "Đã có lỗi xảy ra phía máy chủ vui lòng thử lại sau :(");
    }
}

export class UnauthorizedEception extends Error {
    constructor(mess?: string) {
        super(mess || "Bạn phải đăng nhập để truy cập trang này");
    }
}

export class ForbiddenException extends Error {
    constructor(mess?: string) {
        super(mess || "Bạn không có quyền truy cập tài nguyên này");
    }
}

export class BadRequestException extends Error {
    constructor(mess?: string) {
        super(mess || "Dữ liệu truyền lên không hợp lệ!");
    }
}
