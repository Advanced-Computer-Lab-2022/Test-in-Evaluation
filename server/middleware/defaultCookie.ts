import { Request, Response } from "express";
import { defaultCookieGenerator } from "../utils/defaultCookieGenerator";


export const defaultCookieMiddleware = (req: Request, res: Response, next: () => any) => {
    if (!req.session.data) req.session.data = defaultCookieGenerator();
    return next();
};
