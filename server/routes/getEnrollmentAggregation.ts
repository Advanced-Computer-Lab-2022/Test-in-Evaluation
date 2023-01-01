import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, Enrollment, User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/get_enrollment_aggregation" as const;

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
            if (userSession.userType !== UserTypes.instructor) {
                return res.status(401).send("Unauthorized");
            }

            const course = await Course.findById(courseId);
            if (!course) return res.status(404).send("Course not found");

            const user = await User.findOne({ username: userSession.username });
            if (!user) return res.status(404).send("User not found");

            if (course.instructor?.toString() !== user.id?.toString()) {
                return res.status(401).send("Unauthorized");
            }

            // get the sum of amount paid and the count of enrollments
            const enrollments = await Enrollment.find({
                courseId: courseId,
            });
            const count = enrollments.length;

            const sum = enrollments.reduce(
                (acc: number, curr) => acc + (curr.amountPaid as number),
                0
            );
            return res.status(200).send({ sum, count });
        }
    );
};
