import { Express } from "express";
import { Record, Static } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Enrollment, User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/get_corp_users" as const;

const Input = Record({});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const userSession = req.session.data;
            if (userSession.userType !== UserTypes.admin)
                return res.status(401).send("Unauthorized");

            const users = await User.find({
                userType: "corporateTrainee",
            });
            return res.status(200).send(users);
        }
    );
};
