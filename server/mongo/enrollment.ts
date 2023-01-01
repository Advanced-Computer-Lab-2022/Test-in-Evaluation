import { Schema } from "mongoose";
import { EnrollmentStatusType } from "../types/enrollment";

export const EnrollmentSchema = new Schema({
    status: {
        type: String,
        enum: EnrollmentStatusType,
    },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    studentId: { type: Schema.Types.ObjectId, ref: "User" },
    amountPaid: Number,
    paymentDate: { type: Date, default: () => new Date() },
    completedExercises: [
        {
            sectionId: { type: Schema.Types.ObjectId, ref: "Section" },
            exerciseIdx: Number,
        },
    ],
    completedVideos: [
        { sectionId: { type: Schema.Types.ObjectId, ref: "Section" } },
    ],
});

EnrollmentSchema.index({ courseId: 1, studentId: 1 }, { unique: true });
