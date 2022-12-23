import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { ReportedProblem, User } from "../mongo";
import { Request, Response } from "../types/express";
import {
    ReportedProblemCategoryType,
    ReportedProblemStatusType,
} from "../types/reportedProblem";

const path = "/api/report_problem" as const;

const Input = Record({
    courseId: String,
    title: String,
    description: String,
    category: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const userSession = req.session.data;
            if (!userSession.userType)
                return res.status(401).send("Unauthorized");

            const { courseId, title, description, category } = req.body;
            if (!(category in ReportedProblemCategoryType))
                return res.status(400).send("Invalid category");

            const user = await User.findOne({ username: userSession.username });
            if (!user) return res.status(404).send("User not found");

            const reportedProblem = await ReportedProblem.create({
                course: courseId,
                user: user.id,
                title,
                description,
                comments: [],
                category,
                status: ReportedProblemStatusType.unseen,
            });

            return res.status(200).send(reportedProblem);
        }
    );
};
