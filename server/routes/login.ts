import { verify } from "argon2";
import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/login" as const;

const Input = Record({
    username: String,
    password: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).send({ error: "User not found" });

        const passwordHash = user.passwordHash || "";
        const isCorrect = await verify(passwordHash, password);

        if (!isCorrect) return res.status(400).send({ error: "Incorrect password" });

        const userType = UserTypes[user.userType! as keyof typeof UserTypes];

        if (!userType) return res.status(400).send({ error: "User type not found" });

        req.session.data = {
            userType,
            username: user.username!,
        };

        res.send({ success: true });
    });
};
