import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Subject} from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/create_subject" as const;

const Input = Record({
    Name: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        if (req.session.data.userType != UserTypes.admin) {
            res.status(500).send("Unauthorized");
            return;
        }
        await Subject.create({Name: req.body.Name});
        res.send({ success: true });
        return;
    });
};
