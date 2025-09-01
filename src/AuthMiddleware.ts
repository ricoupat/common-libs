import { Request, Response, NextFunction } from "express";
import ApiKeys from "./config/ApiKeys";


export default class AuthMiddleware {
    private keys: ApiKeys;

    constructor() {
        this.keys = new ApiKeys();
    }

    public authentification = (req: Request, res: Response, next: NextFunction) => {
        const apiKey = req.header("X-API-KEY");

        if (!apiKey || !Object.values(this.keys).includes(apiKey)) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        next();
    }
}