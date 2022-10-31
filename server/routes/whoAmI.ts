import { Express } from "express";
import { Record, Static } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Request, Response } from "../types/express";

const path = "/api/who_am_i" as const;

const Input = Record({});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const client = req.session.data;
        if (client.userType) {
            res.send({ type: client.userType, username: client.username, isGuest: false });
        } else {
            res.send({ isGuest: true });
        }
    });
};