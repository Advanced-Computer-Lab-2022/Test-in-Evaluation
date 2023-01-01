import { Express } from "express";
import { Record, Static } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, Enrollment, User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/get_my_enrollments" as const;

const Input = Record({});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const userSession = req.session.data;
            if (!userSession.userType)
                return res.status(401).send("Unauthorized");

            const user = await User.findOne({ username: userSession.username });
            if (!user) return res.status(404).send("User not found");
            const userId = user._id;

            if (userSession.userType === UserTypes.instructor) {
                const courses = await Course.find({ instructor: userId });
                const coursesWithEnrollments = await Promise.all(
                    courses.map(async (course) => {
                        const enrollments = await Enrollment.find({
                            courseId: course._id,
                        });
                        return { course, enrollments };
                    })
                );
                return res.status(200).send(coursesWithEnrollments);
            } else {
                const enrollments = await Enrollment.find({
                    studentId: userId,
                }).populate({
                    path: "courseId",
                    populate: [{ path: "subjectId" }, { path: "instructor" }],
                });
                return res.status(200).send(enrollments);
            }
        }
    );
};
