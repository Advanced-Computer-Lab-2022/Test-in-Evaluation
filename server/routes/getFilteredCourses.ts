import { Express } from "express";
import mongoose from 'mongoose';
import { Record, Static } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Request, Response } from "../types/express";

const path = "/api/courses" as const;

import {CourseSchema} from '../Model/course'
const Course = mongoose.model('Course', CourseSchema);


const Input = Record({
    title: String,
    subject: String,
    summary: String,
    price: Number,
    sections: Array(Record({ title: String, description: String, totalHours: Number })),
});
type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        
    });
};
