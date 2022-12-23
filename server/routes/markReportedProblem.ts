import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { ReportedProblem, User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/mark_reported_problem" as const;

const Input = Record({
    reportedProblemId: String,
    newStatus: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const userSession = req.session.data;
            if (userSession.userType !== UserTypes.admin)
                return res.status(401).send("Unauthorized");

            const { reportedProblemId, newStatus } = req.body;

            const user = await User.findOne({ username: userSession.username });
            if (!user) return res.status(404).send("User not found");

            const reportedProblem = await ReportedProblem.updateOne(
                { _id: reportedProblemId },
                { status: newStatus }
            );

            if (reportedProblem.matchedCount === 0)
                return res.status(404).send("Reported problem not found");

            return res.status(200).send("Reported problem updated");
        }
    );
};
