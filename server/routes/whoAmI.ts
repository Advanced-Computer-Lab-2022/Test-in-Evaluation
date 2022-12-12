import { Express } from "express";
import { Record, Static } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/who_am_i" as const;

const Input = Record({});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const client = req.session.data;
            if (client.userType) {
                const user = await User.findOne({ username: client.username });
                const { passwordHash, ...retUser } = user!.toObject();
                if (client.userType == UserTypes.instructor)
                    res.send({
                        type: client.userType,
                        username: client.username,
                        acceptedContract: client.acceptedContract,
                        isGuest: false,
                        user: retUser,
                    });
                else
                    res.send({
                        type: client.userType,
                        username: client.username,
                        isGuest: false,
                        user: retUser,
                    });
            } else {
                res.send({ isGuest: true });
            }
        }
    );
};
