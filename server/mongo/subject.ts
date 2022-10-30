import { Schema } from "mongoose";

export const SubjectSchema = new Schema({
    Name: { type: String, unique: true }
});