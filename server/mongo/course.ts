import { Schema } from "mongoose";

export const CourseSchema = new Schema({
    title: String,
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject" },
    summary: String,
    totalHours: Number,
    price: Number,
    rating: {
        sumOfRatings: { type: Number, default: 0 },
        NumberOfRatings: { type: Number, default: 0 },
    },
    avgRating: { type: Number, default: 0 },
    instructor: { type: Schema.Types.ObjectId, ref: "User" },
    videoPreviewUrl: String,
    discount: { rate: Number, startDate: Date, endDate: Date },
    viewsCount: { type: Number, default: 0 },
});

CourseSchema.pre("save", function (next) {
    if (this.rating && this.rating.NumberOfRatings > 0)
        this.avgRating = this.rating.sumOfRatings / this.rating.NumberOfRatings;
    next();
});
