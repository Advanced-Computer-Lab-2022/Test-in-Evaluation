import { Schema } from "mongoose";

export const CourseSchema = new Schema({
    title: String,
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject" },
    summary: String,
    totalHours: Number,
    price: Number,
    rating: {
        sumOfRatings: { type: Number, default: 0 },
        numberOfRatings: { type: Number, default: 0 },
    },
    instructor: { type: Schema.Types.ObjectId, ref: "User" },
    videoPreviewUrl: String,
    discount: { rate: Number, startDate: Date, endDate: Date },
});
