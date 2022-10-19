import { hash } from "argon2";
import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/create_user" as const;

const Input = Record({
    username: String,
    password: String,
    type: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        if (req.session.data.userType !== UserTypes.admin) return res.status(400).send({ errors: "unauthorized" });

        const type = req.body.type;

        const base = { username: req.body.username, password: await hash(req.body.password) };
        if (type === "admin") {
            await User.create({
                ...base,
                userType: UserTypes.admin,
            });
        } else if (type === "instructor") {
            await User.create({
                ...base,
                userType: UserTypes.instructor,
            });
        } else if (type === "corporate") {
            await User.create({
                ...base,
                userType: UserTypes.corporateTrainee,
            });
        } else res.status(500).send({ error: "unknown type" });
    });
};
