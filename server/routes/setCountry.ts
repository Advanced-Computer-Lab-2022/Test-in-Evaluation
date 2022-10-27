import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { isNotAdmin } from "../middleware/isNotAdmin";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";

const path = "/api/set_country" as const;

const Input = Record({
    country: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), isNotAdmin, async (req: Request<Input>, res: Response) => {
        const country = req.body.country;
        if (req.session.data.userType) {
            await User.updateOne({ username: req.session.data.username }, { $set: { country } });
        } else {
            req.session.data.country = country;
        }
        res.send({ ok: true });
    });
};
