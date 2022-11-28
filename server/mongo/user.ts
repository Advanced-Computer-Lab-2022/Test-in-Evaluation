import { Schema } from "mongoose";
import { UserTypes, GenderTypes } from "../types/user";

export const UserSchema = new Schema({
    username: { type: String, unique: true },
    firstName: String,
    lastName: String,
    passwordHash: String,
    userType: {
        type: String,
        enum: UserTypes,
    },
    email: String,
    gender: {
        type: String,
        enum: GenderTypes,
    },
    country: String,
    rating: { sumOfRatings: { type: Number, default: 0 }, numberOfRatings: { type: Number, default: 0 } },
});
