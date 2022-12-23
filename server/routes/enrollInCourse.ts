import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, Enrollment, User } from "../mongo";
import { EnrollmentStatusType } from "../types/enrollment";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/enroll_in_course" as const;

const Input = Record({
    courseId: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const user = req.session.data;
        const course = await Course.findById(req.body.courseId);
        if (!course) return res.status(404).send("Course not found");
        const discount = course.discount && course.discount?.startDate! <= new Date() && course.discount?.endDate! >= new Date() ? course.discount?.rate! : 0;
        const price = course.price! * (1 - discount);
        if (user?.userType === UserTypes.individualTrainee) {
            const session = await Enrollment.startSession();
            session.startTransaction();
            try {
                // transaction:
                // 1. add enrollment
                // 2. take money from student
                const student = await User.findOne({ username: user.username }, {}, { session });
                if (!student) return res.status(404).send("Student not found");

                if (student.wallet < price) return res.status(400).send("Not enough money in your wallet");

                await User.updateOne({ username: user.username }, { $inc: { wallet: -price } }, { session });

                await Enrollment.create(
                    {
                        courseId: course._id,
                        studentId: student._id,
                        status: EnrollmentStatusType.accepted,
                        amountPaid: price,
                    },
                    { session }
                );

                await session.commitTransaction();
                await session.endSession();
            } catch (e) {
                await session.abortTransaction();
                await session.endSession();
                return res.status(500).send("Something went wrong");
            }

            return res.status(200).send("Enrolled successfully");
        } else if (user?.userType === UserTypes.corporateTrainee) {
            const student = await User.findOne({ username: user.username });
            if (!student) return res.status(404).send("Student not found");

            await Enrollment.create({
                courseId: course._id,
                studentId: student._id,
                status: EnrollmentStatusType.pending,
                amountPaid: 0,
            });

            return res.status(200).send("Enrollment request sent");
        } else {
            return res.status(401).send("Unauthorized");
        }
    });
};
