import { Express } from "express";
import { Number, Record, Static } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";

const path = "/api/pay_to_wallet" as const;

const Input = Record({
    amount: Number,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const userSession = req.session.data;
            if (!userSession.userType)
                return res.status(401).send("Unauthorized");

            const user = await User.updateOne(
                { username: userSession.username },
                { $inc: { wallet: req.body.amount } }
            );
            if (!user) return res.status(404).send("User not found");

            return res.status(200).send({ success: true });
        }
    );
};
