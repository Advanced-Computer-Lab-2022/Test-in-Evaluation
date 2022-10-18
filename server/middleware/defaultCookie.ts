import { Request, Response } from "express";
import { Cookie } from "../types/cookies";

const defaultCookieGenerator = (): Cookie => ({
    userType: null,
    country: undefined,
});

export const defaultCookieMiddleware = (req: Request, res: Response, next: () => any) => {
    // note may cause issues from object instantiation 
    if (!req.session || !("userType" in req.session)) (req.session as any) = { ...(req.session ?? {}), ...defaultCookieGenerator() };
    return next();
};
