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
            const [sum, count] = await Enrollment.aggregate([
                { $match: { courseId } },
                {
                    $group: {
                        _id: null,
                        sum: { $sum: "$amountPaid" },
                        count: { $sum: 1 },
                    },
                },
            ]).then((result) => {
                if (result.length === 0) {
                    return [0, 0];
                }
                return [result[0].sum, result[0].count];
            });

            return res.status(200).send({ sum, count });
        }
    );
};
