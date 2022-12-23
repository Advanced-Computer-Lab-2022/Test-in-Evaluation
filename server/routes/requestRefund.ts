import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Enrollment, Section, User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/request_refund" as const;

const Input = Record({
    enrollmentId: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            // request a refund for a given enrollment if the completed sections is less than half of the total sections
            const { enrollmentId } = req.body;
            const userSession = req.session.data;

            if (userSession.userType !== UserTypes.individualTrainee)
                return res.status(401).send("Unauthorized");

            const enrollment = await Enrollment.findById(enrollmentId);
            if (!enrollment)
                return res.status(404).send("Enrollment not found");
            if (enrollment.status !== "accepted")
                return res.status(400).send("Enrollment not accepted");

            const user = await User.findOne({ username: userSession.username });
            if (!user) return res.status(404).send("User not found");
            if (enrollment.studentId !== user.id)
                return res.status(401).send("Unauthorized");

            const sections = await Section.find({
                courseId: enrollment.courseId,
            });
            if (sections.length === 0)
                return res.status(404).send("Sections not found");

            if (enrollment.completedSections.length < sections.length / 2) {
                // refund
                // transaction:
                // cancel enrollment
                // add money to user's wallet

                const session = await Enrollment.startSession();
                session.startTransaction();
                try {
                    const updateEnrollment = await Enrollment.updateOne(
                        { _id: enrollmentId, status: "accepted" },
                        { status: "refunded" },
                        { session }
                    );
                    if (updateEnrollment.modifiedCount === 0)
                        throw new Error(
                            "Enrollment not found or already refunded"
                        );
                    await User.updateOne(
                        { _id: user.id },
                        { $inc: { wallet: enrollment.amountPaid } }
                    );
                    await session.commitTransaction();
                    await session.endSession();

                    return res.status(200).send("Refunded successfully");
                } catch (e) {
                    await session.abortTransaction();
                    await session.endSession();
                    return res.status(500).send("Something went wrong");
                }
            } else {
                return res.status(400).send("Cannot refund");
            }
        }
    );
};
