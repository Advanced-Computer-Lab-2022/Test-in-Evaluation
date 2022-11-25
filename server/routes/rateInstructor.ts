import { Express } from "express";
import { Number, Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/rate_instructor" as const;

const Input = Record({
    instructorId: String,
    rating: Number,
    comment: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const { instructorId, rating, comment } = req.body;

        const client = req.session.data;

        if (client.userType !== UserTypes.corporateTrainee && client.userType !== UserTypes.individualTrainee) return res.status(400).send({ error: "unauthorized" });

        const [instructor, me] = await Promise.all([User.findById(instructorId), User.findOne({ username: client.username })]);

        if (!instructor || instructor.userType !== UserTypes.instructor) return res.status(400).send({ error: "instructor not found" });
        if (!me) return res.status(400).send({ error: "user not found" });

        const review = {
            reviewerId: me.id,
            review: comment,
            rating,
        };

        await User.findOneAndUpdate(
            {
                _id: instructorId,
            },
            {
                $push: {
                    reviews: review,
                },
                $inc: {
                    "rating.sumOfRatings": rating,
                    "rating.numberOfRatings": 1,
                },
            }
        );

        res.send({ success: true });
    });
};
