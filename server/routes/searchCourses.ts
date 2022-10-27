import { Express } from "express";
import { Number, Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, User } from "../mongo";
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
    app.get(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const { instructor, priceHigh, priceLow, ratingHigh, ratingLow, subject, title } = req.body;
        const isCorporate = req.session.data.userType === UserTypes.corporateTrainee;
        if ((priceHigh !== undefined || priceLow !== undefined) && isCorporate) return res.status(400).send({ error: "unauthorized" });

        const instructorId = instructor ? await User.findOne({ username: instructor }).then((v) => v?._id) : undefined;

        const rating = ratingHigh || ratingLow ? { ...(ratingLow ? { $gte: ratingLow } : {}), ...(ratingHigh ? { $lte: ratingHigh } : {}) } : undefined;
        const price = priceHigh || priceLow ? { ...(priceLow ? { $gte: priceLow } : {}), ...(priceHigh ? { $lte: priceHigh } : {}) } : undefined;

        const filter = {
            ...(instructorId ? { instructor: instructorId } : {}),
            ...(subject ? { subject } : {}),
            ...(title ? { title: { $regex: title } } : {}),
            ...(rating ? { rating } : {}),
            ...(price ? { price } : {}),
        };

        const result = await Course.find(filter)
            .populate("instructor", "firstName lastName username")
            .then((v) =>
                v.map((u) => {
                    const ret = u.toObject();
                    if (isCorporate) ret.price = undefined;
                    return ret;
                })
            );

        res.send({ result });
        return;
    });
};
