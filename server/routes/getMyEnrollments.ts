import { Express } from "express";
import { Record, Static } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Enrollment, User } from "../mongo";
import { Request, Response } from "../types/express";

const path = "/api/get_my_enrollments" as const;

const Input = Record({});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const userSession = req.session.data;
        if (!userSession.userType) return res.status(401).send("Unauthorized");

        const user = await User.findOne({ username: userSession.username });
        if (!user) return res.status(404).send("User not found");
        const userId = user._id;

        const enrollments = await Enrollment.find({ studentId: userId });
        return res.status(200).send(enrollments);
    });
};
