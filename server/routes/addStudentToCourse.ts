import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, Enrollment, User } from "../mongo";
import { EnrollmentStatusType } from "../types/enrollment";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/add_student_to_course" as const;

const Input = Record({
    studentId: String,
    courseId: String,
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

            const course = await Course.findById(req.body.courseId);
            if (!course) return res.status(404).send("Course not found");

            const user = await User.findById(req.body.studentId);
            if (!user) return res.status(404).send("Student not found");

            await Enrollment.create({
                courseId: course._id,
                studentId: user._id,
                status: EnrollmentStatusType.accepted,
                amountPaid: 0,
            });

            return res.status(200).send("Student added to course");
        }
    );
};
