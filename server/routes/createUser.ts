import { hash } from "argon2";
import { Express } from "express";
import { Record, Static, String, Union, Literal } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/create_user" as const;

const Input = Record({
    username: String.withConstraint((s) => s.length > 5),
    password: String.withConstraint((s) => s.length > 8),
    firstName: String.withConstraint((s) => s.length > 0),
    lastName: String.withConstraint((s) => s.length > 0),
    email: String.withConstraint((s) => s.length > 0),
    gender: Union(Literal("male"), Literal("female")),
    type: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        if (req.session.data.userType !== UserTypes.admin) return res.status(400).send({ error: "unauthorized" });

        const type = req.body.type;
        const userType = type in UserTypes && UserTypes[type as keyof typeof UserTypes];
        if (!userType) return res.status(500).send({ error: "unknown type" });

        const newUser = {
            username: req.body.username,
            passwordHash: await hash(req.body.password),
            userType,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
        };

        try{
            await User.create(newUser);
        } catch (err: any) {
            res.status(500).send(err.message)
        }

        res.send({ success: true });
    });
};
