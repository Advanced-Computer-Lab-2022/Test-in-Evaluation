import { hash } from "argon2";
import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/sign_up" as const;

const Input = Record({
    username: String.withConstraint((s) => s.length > 5),
    password: String.withConstraint((s) => s.length > 8),
    firstName: String.withConstraint((s) => s.length > 0),
    lastName: String.withConstraint((s) => s.length > 0),
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        if (req.session.data.userType) return res.status(400).send({ error: "You can't sign up because you are already signed in" });

        const { username, password, firstName, lastName } = req.body;
        const country = req.session.data.country;
        const userType = UserTypes.individualTrainee;

        const user = await User.create({
            username,
            passwordHash: await hash(password),
            firstName,
            lastName,
            userType,
            country,
        }).catch((v) => null);

        if (!user) return res.status(400).send({ error: "Error while creating user" });

        req.session.data = {
            userType,
            username,
        };

        return res.send({ success: true });
    });
};
