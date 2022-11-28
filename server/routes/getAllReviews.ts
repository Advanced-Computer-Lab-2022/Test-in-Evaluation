import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Review } from "../mongo";
import { Request, Response } from "../types/express";
import { getReviewedObject } from "./writeReview";

const path = "/api/get_all_reviews" as const;

const Input = Record({
    reviewed: String
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const { reviewed } = req.body;
        const reviewedObj = await getReviewedObject(reviewed);
        if (!reviewedObj)
            return res.status(400).send("Invalid Content");
        res.send(await Review.find({reviewed}));
    });
};