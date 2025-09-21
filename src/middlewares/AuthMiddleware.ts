import { Request, Response, NextFunction } from "express";
import ApiKeys from "../config/ApiKeys";


export class AuthMiddleware {
    private keys: ApiKeys;

    constructor() {
        this.keys = new ApiKeys();
    }

    public authentification = (req: Request, res: Response, next: NextFunction) => {
        const validKeys = this.keys.loadKeys();
        const apiKey = req.header("X-API-KEY");

        if (!apiKey || !Object.values(validKeys).includes(apiKey)) {
            console.warn(`Unauthorized request with key: ${apiKey}`);
            return res.status(401).json({ error: "Unauthorized" });
        }

        next();
    }
}