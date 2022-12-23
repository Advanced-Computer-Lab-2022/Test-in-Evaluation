import { hash, verify } from "argon2";
import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/change_current_password" as const;

const Input = Record({
    currentPassword: String,
    newPassword: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const { currentPassword, newPassword } = req.body;
            if (!req.session.data.userType)
                return res.status(400).send({ error: "User not logged in" });

            const user = await User.findOne({
                username: req.session.data.username,
            });
            if (!user) return res.status(400).send({ error: "User not found" });

            const passwordHash = user.passwordHash || "";
            const isCorrect = await verify(passwordHash, currentPassword);

            if (!isCorrect)
                return res.status(400).send({ error: "Incorrect password" });

            await user.update({ passwordHash: await hash(newPassword) });

            res.send({ success: true });
        }
    );
};
