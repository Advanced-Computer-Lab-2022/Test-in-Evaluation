import { Express } from "express";
import { Record, Static } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";
import { User } from "../mongo";

const path = "/api/contract" as const;

const Input = Record({});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            if (req.session.data.userType !== UserTypes.instructor)
                return res.status(401).send({ error: "unauthorized" });
            const client = req.session.data;
            const user = await User.findOneAndUpdate(
                { username: client.username },
                { acceptedContract: true }
            );
            res.status(200).send({ success: true });
        }
    );
};
