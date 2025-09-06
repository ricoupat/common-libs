import { AuthMiddleware } from "../src";
import { Request, Response } from "express";

describe("AuthMiddleware", () => {
    let middleware: AuthMiddleware;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        middleware = new AuthMiddleware();

        req = {
            header: jest.fn()
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    it("should call next() when a valid API key is provided", () => {
        process.env.MANGA_SERVICE_KEY = "valid-key";

        (req.header as jest.Mock).mockReturnValue("valid-key");

        middleware.authentification(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should return 401 when an invalid API key is provided", () => {
        process.env.MANGA_SERVICE_KEY = "valid-key";

        (req.header as jest.Mock).mockReturnValue("invalid-key");

        middleware.authentification(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
        expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 when no API KEY provided", () => {
        process.env.MANGA_SERVICE_KEY = "valid-key";

        (req.header as jest.Mock).mockReturnValue(undefined);

        middleware.authentification(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
        expect(next).not.toHaveBeenCalled();
    });
});