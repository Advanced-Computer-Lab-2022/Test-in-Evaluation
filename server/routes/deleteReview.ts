import { Express } from "express";
import { Types } from "mongoose";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Review, User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";
import { getReviewedObject } from "./writeReview";

const path = "/api/delete_review" as const;

const Input = Record({
    reviewId: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            if (
                req.session?.data.userType !== UserTypes.individualTrainee &&
                req.session?.data.userType !== UserTypes.corporateTrainee
            ) {
                return res
                    .status(403)
                    .send("You are not allowed to delete reviews");
            }

            const { reviewId } = req.body;

            const review = await Review.findById(reviewId);
            if (!review) return res.status(404).send("Review not found");

            const student = await User.findOne(
                { username: req.session?.data.username },
                {}
            );
            if (!student) return res.status(404).send("Student not found");

            if (review.reviewer?.toString() !== student._id.toString())
                return res
                    .status(403)
                    .send("You are not allowed to delete this review");

            await Review.deleteOne({ _id: reviewId });

            res.send(true);
        }
    );
};
