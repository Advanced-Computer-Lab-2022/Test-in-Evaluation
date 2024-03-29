import { Express } from "express";
import { Number, Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, User, Subject } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/search_courses" as const;

const Input = Record({
    subject: String.optional(),
    title: String.optional(),
    instructor: String.optional(),

    // inclusive,inclusive
    ratingLow: Number.optional(),
    ratingHigh: Number.optional(),

    //inclusive,inclusive
    priceLow: Number.optional(),
    priceHigh: Number.optional(),
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            let {
                instructor,
                priceHigh,
                priceLow,
                ratingHigh,
                ratingLow,
                subject,
                title,
            } = req.body;
            const isCorporate =
                req.session.data.userType === UserTypes.corporateTrainee;

            if (isCorporate) {
                priceHigh = undefined;
                priceLow = undefined;
            }

            const instructorId = instructor
                ? await User.findOne({ username: instructor }).then(
                      (v) => v?._id
                  )
                : undefined;

            const avgRating =
                ratingHigh || ratingLow
                    ? {
                          ...(ratingLow ? { $gte: ratingLow } : {}),
                          ...(ratingHigh ? { $lte: ratingHigh } : {}),
                      }
                    : undefined;
            const price =
                priceHigh || priceLow
                    ? {
                          ...(priceLow ? { $gte: priceLow } : {}),
                          ...(priceHigh ? { $lte: priceHigh } : {}),
                      }
                    : undefined;
            const subjectId = subject
                ? await Subject.findOne({ Name: subject }).then((v) => v?._id)
                : undefined;

            const filter = {
                ...(instructorId ? { instructor: instructorId } : {}),
                ...(subjectId ? { subjectId: subjectId } : {}),
                ...(title ? { title: { $regex: title } } : {}),
                ...(avgRating ? { avgRating } : {}),
                ...(price ? { price } : {}),
            };

            const result = await Course.find(filter)
                .populate("instructor", "firstName lastName username")
                .populate("subjectId", "Name")
                .then((v) =>
                    v.map((u) => {
                        const ret = u.toObject();
                        return ret;
                    })
                );

            res.send({ result });
            return;
        }
    );
};
