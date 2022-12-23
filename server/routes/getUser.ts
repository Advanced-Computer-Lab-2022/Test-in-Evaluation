import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/get_user" as const;

const Input = Record({
    userId: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        if (req.session.data.userType !== UserTypes.admin) return res.status(401).send("Unauthorized");

        const user = await User.findById(req.body.userId);

        if (!user) return res.status(404).send("User not found");

        return res.status(200).send(user);
    });
};
