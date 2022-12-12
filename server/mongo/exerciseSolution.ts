import { Schema } from "mongoose";
export const ExerciseSolutionSchema = new Schema(
  {
    section: { type: Schema.Types.ObjectId, ref: "Section" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    solutions: [Number],
  },
  { timestamps: true }
);
