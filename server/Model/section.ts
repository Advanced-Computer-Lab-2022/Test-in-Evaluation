import { Schema } from "mongoose";

// in the future it must have a relations with content(videos) and even progress of the user, so keeping it as a seperate model is best
// aka: Subtitle
export const SectionSchema = new Schema({
    name: String,
    description: String,
    totalHours: Number,
    parentCourse: { type: Schema.Types.ObjectId, ref: "Course" },
    // TODO: add video objects, ...
});
