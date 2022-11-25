import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { ExerciseSolution, Section, User } from "../mongo";
import { Request, Response } from "../types/express";

const path = "/api/<MyMethod>" as const;

const Input = Record({
    sectionId: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const { sectionId } = req.body;

        const client = req.session.data;

        if (client.userType === null) return res.status(400).send({ error: "unauthorized" });

        const user = await User.findOne({ username: client.username });

        if (!user) return res.status(400).send({ error: "user not found" });

        const [section, excerciseSol] = await Promise.all([Section.findOne({ _id: sectionId }), ExerciseSolution.find({ section: sectionId, user: user._id })]);

        if (!section) return res.status(400).send({ error: "section not found" });

        const ret = {
            section: section.toObject(),
            exerciseSolutions: excerciseSol.map((v) => v.toObject()),
        };

        res.send(ret);
    });
};
