import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, Enrollment, User } from "../mongo";
import { EnrollmentStatusType } from "../types/enrollment";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/get_is_enrolled" as const;

const Input = Record({
    courseId: String,
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

            const user = await User.findOne({ username: userSession.username });
            if (!user) return res.status(404).send("User not found");
            const userId = user._id;

            const num = await Enrollment.findOne({
                studentId: userId,
                courseId: req.body.courseId,
            });
            if (num && num.status === EnrollmentStatusType.accepted) {
                return res.status(200).send({
                    isEnrolled: true,
                    enrollmentId: num._id,
                });
            }
            return res.status(200).send({
                isEnrolled: false,
                enrollmentId: "",
            });
        }
    );
};
