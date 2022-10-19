import { Express } from "express";
import { Number, Record, Static, String, Undefined } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/search_courses" as const;

const Input = Record({
    subject: String.Or(Undefined),
    title: String.Or(Undefined),
    instructor: String.Or(Undefined),

    // inclusive,inclusive
    ratingLow: Number.Or(Undefined),
    ratingHigh: Number.Or(Undefined),

    //inclusive,inclusive
    priceLow: Number.Or(Undefined),
    priceHigh: Number.Or(Undefined),
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const { instructor, priceHigh, priceLow, ratingHigh, ratingLow, subject, title } = req.body;
        const isCorporate = req.session.data.userType === UserTypes.corporateTrainee;
        if ((priceHigh !== undefined || priceLow !== undefined) && isCorporate) return res.status(400).send({ error: "unauthorized" });

        const instructorId = instructor ? await User.findOne({ username: instructor }).then((v) => v?._id) : undefined;
        const result = await Course.find({ subject, instructor: instructorId, title, price: { $gte: priceLow, $lte: priceHigh }, rating: { $gte: ratingLow, $lte: ratingHigh } })
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
