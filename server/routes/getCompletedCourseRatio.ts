import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Enrollment, User } from "../mongo";
import { Request, Response } from "../types/express";
import { getCompletedCourseRatio } from "../utils/getCompletedCourseRatio";

const path = "/api/get_completed_course_ratio" as const;

const Input = Record({
    courseId: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const { courseId } = req.body;

            const userSession = req.session.data;
            if (!userSession.userType) {
                return res.status(401).send("Unauthorized");
            }

            const user = await User.findOne({ username: userSession.username });
            if (!user) return res.status(404).send("User not found");

            const enrollment = await Enrollment.findOne({
                courseId,
                studentId: user.id,
            });

            if (!enrollment) {
                return res.status(404).send("Enrollment not found");
            }

            const [count, total] = await getCompletedCourseRatio(enrollment.id);

            return res.status(200).send({ count, total });
        }
    );
};
