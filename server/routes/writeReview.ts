import { Express } from "express";
import { Number, Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User, Review, Course } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/write_review" as const;

const Input = Record({
  reviewed: String,
  score: Number,
  text: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
  // works for both create and update
  app.post(
    path,
    validateInput(Input),
    async (req: Request<Input>, res: Response) => {
      if (
        req.session.data.userType != UserTypes.individualTrainee &&
        req.session.data.userType != UserTypes.corporateTrainee
      ) {
        return res.status(400).send("Unauthorized");
      }
      const { reviewed, score, text } = req.body;
      const reviewerUserName = req.session.data.username;
      const reviewer = await User.findOne({ username: reviewerUserName });
      const oldReview = await Review.findOne({ reviewer, reviewed });
      const reviewedObj = await getReviewedObject(reviewed);
      if (!reviewedObj) return res.status(400).send("Invalid Content");
      if (oldReview) {
        // update
        reviewedObj.rating.sumOfRatings +=
          score - (oldReview.score ? oldReview.score : 0);

        oldReview.score = score;
        oldReview.text = text;
        await oldReview.save();
      } else {
        // create
        reviewedObj.rating.sumOfRatings += score;
        reviewedObj.rating.NumberOfRatings++;

        await Review.create({ reviewer, reviewed, score, text });
      }
      res.send({ sucess: true });
    }
  );
};

export async function getReviewedObject(reviewedId: string): Promise<any> {
  const course = await Course.findById(reviewedId);
  if (course) return course;
  const instructor = await User.findById(reviewedId);
  return instructor;
}
