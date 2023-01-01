import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Enrollment, Section, User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";
import { getCompletedCourseRatio } from "../utils/getCompletedCourseRatio";
import { sendEmail } from "../utils/sendEmail";

const path = "/api/accept_refund" as const;

const Input = Record({
    enrollmentId: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const { enrollmentId } = req.body;

            const userSession = req.session.data;
            if (userSession.userType !== UserTypes.admin)
                return res.status(401).send("Unauthorized");

            const enrollment = await Enrollment.findById(enrollmentId);
            if (!enrollment)
                return res.status(404).send("Enrollment not found");
            if (enrollment.status !== "pendingRefund")
                return res.status(400).send("Enrollment not pending refund");

            const user = await User.findById(enrollment.studentId);
            if (!user) return res.status(404).send("User not found");

            try {
                const updateEnrollment = await Enrollment.deleteOne({
                    _id: enrollmentId,
                });

                await User.updateOne(
                    { _id: user.id },
                    { $inc: { wallet: enrollment.amountPaid } }
                );

                if (updateEnrollment.deletedCount === 0)
                    return res.status(400).send("Refund request already sent.");

                await sendEmail(
                    user.email!,
                    "Money Refunded",
                    `You've received the amount ${enrollment.amountPaid} back from your refund request.`
                );

                return res.status(200).send("Refund request completed.");
            } catch (e) {
                return res.status(500).send("Something went wrong");
            }
        }
    );
};
