import { HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
    constructor(message = "Bad Request", details?: any) {
        super(400, message, "BAD_REQUEST", details);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message = "Unauthorized", details?: any) {
        super(401, message, "UNAUTHORIZED", details);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message = "Forbidden", details?: any) {
        super(403, message, "FORBIDDEN", details);
    }
}

export class NotFoundError extends HttpError {
    constructor(message = "Not Found", details?: any) {
        super(404, message, "NOT_FOUND", details);
    }
}