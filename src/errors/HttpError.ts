export class HttpError extends Error {
    public status: number;
    public code?: string;
    public details?: any;

    constructor(status: number, message: string, code?: string, details?: string) {
        super(message);

        this.status = status;
        this.code = code;
        this.details = details;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}