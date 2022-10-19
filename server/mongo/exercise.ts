import { Schema } from "mongoose";

export const ExerciseSchema = new Schema({
    name: String,
    description: String,
    parentSection: { type: Schema.Types.ObjectId, ref: "Section" },
    // TODO: add questions, answers, ....
});
