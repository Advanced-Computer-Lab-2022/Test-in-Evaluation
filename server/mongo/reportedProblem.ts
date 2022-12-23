import { Schema } from "mongoose";
import { ReportedProblemCategoryType, ReportedProblemStatusType } from "../types/reportedProblem";

export const ReportedProblemSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    comments: [String],
    status: { type: String, enum: ReportedProblemStatusType },
    category: { type: String, enum: ReportedProblemCategoryType },
    createdAt: { type: Date, default: () => new Date() },
});
