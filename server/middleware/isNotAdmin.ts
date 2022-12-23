import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

export const isNotAdmin = (req: Request, res: Response, next: () => any) => {
    // note may cause issues from object instantiation
    if (req.session.data.userType === UserTypes.admin) {
        res.status(400).send({ error: "unauthorized" });
        return;
    }
    return next();
};
