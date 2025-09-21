import { HttpError } from "./HttpError";

export class TokenExpiredError extends HttpError {
    constructor() {
        super(401, "Token expired", "TOKEN_EXPIRED");
    }
}

export class TokenInvalidError extends HttpError {
    constructor() {
        super(401, "Invalid token", "TOKEN_INVALID");
    }
}

export class BadCredentialsError extends HttpError {
    constructor() {
        super(401, "Invalid username or password", "BAD_CREDENTIALS");
    }
}