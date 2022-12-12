import { Express } from "express";
import { Types } from "mongoose";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Review, User } from "../mongo";
import { Request, Response } from "../types/express";
import { getReviewedObject } from "./writeReview";

const path = "/api/get_all_reviews" as const;

const Input = Record({
  reviewed: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
  app.post(
    path,
    validateInput(Input),
    async (req: Request<Input>, res: Response) => {
      const { reviewed } = req.body;
      const reviewedObj = await getReviewedObject(reviewed);
      if (!reviewedObj) return res.status(400).send("Invalid Content");

      const reviews = await Review.find({ reviewed });
      const new_reviews = await Promise.all(
        reviews.map(async (review) => {
          return {
            ...review.toObject(),
            reviewerName: await getReviewerName(review.reviewer),
          };
        })
      );

      res.send(new_reviews);
    }
  );
};

async function getReviewerName(
  reviewer: Types.ObjectId | undefined
): Promise<string> {
  const reviewerUser = await User.findById(reviewer);
  return reviewerUser?.firstName + " " + reviewerUser?.lastName;
}
