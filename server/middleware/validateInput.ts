import { Record, ValidationError } from "runtypes";
import { Express, Request, Response } from "express";

export const validateInput =
    (record: Record<any, any>) =>
    (req: Request, res: Response, next: () => any) => {
        try {
            const data = req.body;
            record.check(data);
            return next();
        } catch (e) {
            if (e instanceof ValidationError) {
                res.status(401).send({ error: e.message });
            } else {
                res.status(401).send({ error: "unknown" });
            }
            return;
        }
    };
