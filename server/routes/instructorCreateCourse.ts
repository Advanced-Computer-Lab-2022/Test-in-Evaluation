import { Express } from "express";
import mongoose from 'mongoose';
import { Record, Static, String, Number, Undefined} from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Request, Response } from "../types/express";

const path = "/api/instructor/create-course" as const;

import {CourseSchema} from '../Model/course'
import { UserSchema } from "../Model/user";
const Course = mongoose.model('Course', CourseSchema);
const User = mongoose.model('User', UserSchema);

const Input = Record({
    title: String,
    subject: String,
    summary: String,
    totalHours: Number,
    price: Number,
    instructor: Number,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        let instructor = await User.findById(req.body.instructor);
        if (instructor == null) {
            res.status(400).send("Invalid Instructor ID");
            return;
        }
        Course.create(req.body);
    });
};
