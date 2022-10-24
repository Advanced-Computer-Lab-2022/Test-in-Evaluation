import {Request, Response } from "express";
import mongoose from 'mongoose';

import {CourseSchema} from '../Model/course'
const Course = mongoose.model('Course', CourseSchema);

export const getFilteredCourses = (req: Request, res: Response) => {
    let filters = req.body;
    let courses = Course.find();
    res.send(filter(courses, filters));
}

function filter(courses: any, filters: any) : any {
    if (filters === null)
        return courses;
    if (filters.maxPrice)
        courses = courses.filter((course: any) => course.maxPrice <= filters.maxPrice);
    if (filters.subject)
        courses = courses.filter((course: any) => course.subject == filters.subject);
    if (filters.instructor)
        courses = courses.filter((course: any) => course.instructor == filters.instructor);
    if (filters.title)
        courses = courses.filter((course: any) => course.title.includes(filters.title));
    return courses;
}
