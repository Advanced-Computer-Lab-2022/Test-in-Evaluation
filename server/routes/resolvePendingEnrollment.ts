import { Express } from "express";
import { Boolean, Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Enrollment } from "../mongo";
import { EnrollmentStatusType } from "../types/enrollment";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/resolve_pending_enrollment" as const;

const Input = Record({
    enrollmentId: String,
    accepted: Boolean,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const userSession = req.session.data;
            if (userSession.userType !== UserTypes.admin)
                return res.status(401).send("Unauthorized");

            const { enrollmentId, accepted } = req.body;

            const status = accepted
                ? EnrollmentStatusType.accepted
                : EnrollmentStatusType.rejected;

            const enrollment = await Enrollment.updateOne(
                {
                    _id: enrollmentId,
                    status: EnrollmentStatusType.pending,
                },
                {
                    status,
                }
            );

            console.log("Looked for enrollment");
            if (enrollment.matchedCount === 0)
                return res.status(404).send("Enrollment not found");

            console.log("Found enrollment");
            return res.status(200).send("Enrollment updated");
        }
    );
};
