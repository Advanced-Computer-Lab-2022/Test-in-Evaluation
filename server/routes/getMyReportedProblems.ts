import { Express } from "express";
import { Record, Static } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { ReportedProblem } from "../mongo";
import { Request, Response } from "../types/express";

const path = "/api/getMyReportedProblems/:id" as const;

const Input = Record({});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const { id } = req.params;
            const reportedProblems = await ReportedProblem.find({
                user: id,
            });

            return res.status(200).send(reportedProblems);
        }
    );
};
