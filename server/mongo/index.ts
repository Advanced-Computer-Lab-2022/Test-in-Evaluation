import mongoose from "mongoose";
import { UserSchema } from "./user";
import { CourseSchema } from "./course";
import { ExerciseSchema } from "./exercise";
import { SectionSchema } from "./section";
import { SubjectSchema } from './subject';
import { ReviewSchema } from './review';
import { ExerciseSolutionSchema } from "./exerciseSolution";

export const User = mongoose.model("User", UserSchema);

export const Course = mongoose.model("Course", CourseSchema);

export const Exercise = mongoose.model("Exercise", ExerciseSchema);

export const Section = mongoose.model("Section", SectionSchema);

export const Subject = mongoose.model("Subject", SubjectSchema);

export const Review = mongoose.model("Review", ReviewSchema);

export const ExerciseSolution = mongoose.model("ExerciseSolution", ExerciseSolutionSchema);