import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";

const path = "/api/change_my_profile" as const;

const Input = Record({
    email: String.optional(),
    bio: String.optional(),
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const { email, bio } = req.body;

        const client = req.session.data;

        if (client.userType === null) return res.status(400).send({ error: "unauthorized" });

        const obj = {
            username: client.username,
            ...(email ? { email } : {}),
            ...(bio ? { bio } : {}),
        };

        await User.updateOne(obj);

        res.send({ success: true });
    });
};
