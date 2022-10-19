import { Request, Response } from "express";
import { Cookie } from "../types/cookies";

const defaultCookieGenerator = (): Cookie => ({
    userType: null,
    country: undefined,
});

export const defaultCookieMiddleware = (req: Request, res: Response, next: () => any) => {
    if (!req.session.data) req.session.data = defaultCookieGenerator();
    return next();
};
