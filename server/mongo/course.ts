import { Schema } from "mongoose";

export const CourseSchema = new Schema({
    title: String,
    subject: String,
    summary: String,
    total_hours: Number,
    price: Number,
    rating: { sumOfRatings: Number, numberOfRatings: Number },
    // discount: { rate: Number, endDate: Date },
});
