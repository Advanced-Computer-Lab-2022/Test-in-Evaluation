import { Express } from "express";
import { Record, Static } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Request, Response } from "../types/express";
import { defaultCookieGenerator } from "../utils/defaultCookieGenerator";

const path = "/api/logout" as const;

const Input = Record({});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            req.session.data = defaultCookieGenerator();
            res.send({ success: true });
        }
    );
};
