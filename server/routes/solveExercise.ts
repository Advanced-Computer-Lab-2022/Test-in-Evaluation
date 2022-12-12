import { Express } from "express";
import { Array, Number, Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { ExerciseSolution, User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/solve_exercise" as const;

const Input = Record({
    sectionId: String,
    answers: Array(Number),
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const { sectionId, answers } = req.body;

            const client = req.session.data;

            if (
                client.userType !== UserTypes.corporateTrainee &&
                client.userType !== UserTypes.individualTrainee
            )
                return res.status(400).send({ error: "unauthorized" });

            const user = await User.findOne({ username: client.username });

            if (!user) return res.status(400).send({ error: "user not found" });

            console.log(answers);
            await ExerciseSolution.create({
                solutions: answers,
                user: user._id,
                section: sectionId,
            });

            res.send({ success: true });
        }
    );
};
