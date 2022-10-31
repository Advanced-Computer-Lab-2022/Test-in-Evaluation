import { Schema } from "mongoose";

export const CourseSchema = new Schema({
    title: String,
    subject: Schema.Types.ObjectId,
    summary: String,
    totalHours: Number,
    price: Number,
    rating: { sumOfRatings: { type: Number, defualtValue: 0 }, numberOfRatings: { type: Number, defualtValue: 0 } },
    instructor: { type: Schema.Types.ObjectId, ref: "User" },
    // discount: { rate: Number, endDate: Date },
});
