import { Schema } from "mongoose";

export const ReviewSchema = new Schema({
    reviewer: { type: Schema.Types.ObjectId, ref: "User" },
    reviewed: Schema.Types.ObjectId, // work for both instructor and course
    score: Number,
    text: String,
});
