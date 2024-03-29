import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Subject } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/get_all_subjects" as const;

const Input = Record({});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const result = await Subject.find();
            res.send(result);
            return;
        }
    );
};
