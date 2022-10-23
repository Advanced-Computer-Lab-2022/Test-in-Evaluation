import { Express } from "express";
import mongoose from 'mongoose';
import { Record, Static, String, Number, Undefined} from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Request, Response } from "../types/express";

const path = "/api/courses" as const;

import {CourseSchema} from '../Model/course'
const Course = mongoose.model('Course', CourseSchema);

const Input = Record({
    title: String.Or(Undefined),
    subject: String.Or(Undefined),
    maxPrice: Number.Or(Undefined),
    instructor: Number.Or(Undefined),
});
type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        let filters = req.body;
        let courseFilters = {};
        if (filters.maxPrice !== undefined)
            courseFilters = {price: {$lte: filters.maxPrice}};
        if (filters.instructor !== undefined)
            courseFilters = {...courseFilters, instructor: filters.instructor};
        if (filters.subject !== undefined)
            courseFilters = {...courseFilters, subject: filters.subject};
        if (filters.title !== undefined)
            courseFilters = {...courseFilters, title: {$regex: ".*" + filters.title + ".*"}};
        let result = await Course.find(courseFilters);
        res.send(result);
    });
};
