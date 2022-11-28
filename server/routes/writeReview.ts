import { Express } from "express";
import { Number, Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User, Review, Course } from "../mongo";
import { Request, Response } from "../types/express";

const path = "/api/write_review" as const;

const Input = Record({
    reviewerUserName: String,
    reviewed: String,
    score: Number,
    text: String
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    // works for both create and update
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const { reviewerUserName, reviewed, score, text } = req.body;
        const reviewer = await User.findOne({username: reviewerUserName});
        const oldReview = await Review.findOne({reviewer, reviewed});
        if (oldReview) { // update
            const reviewedObj = await getReviewedObject(reviewed);
            reviewedObj.rating.sumOfRatings += score - (oldReview.score ? oldReview.score : 0);

            oldReview.score = score;
            oldReview.text = text;
            await oldReview.save();
        }
        else { // create
            const reviewedObj = await getReviewedObject(reviewed);
            reviewedObj.rating.sumOfRatings += score;
            reviewedObj.rating.numberOfRatings++;
            
            await Review.create({reviewer, reviewed, score, text});
        }
        res.send({sucess: true});
    });
};

async function getReviewedObject(reviewedId: string) : Promise<any> {
    const course = await Course.findById(reviewedId);
    if (course)
        return course;
    const instructor = await User.findById(reviewedId);
    return instructor;
}
