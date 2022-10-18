import { Schema } from "mongoose";
import { UserTypes } from "../types/user";

export const UserSchema = new Schema({
    username: { type: String, unique: true },
    passwordHash: String,
    userType: {
        type: String,
        enum: UserTypes,
    },
    country: String,
    rating: { sumOfRatings: { type: Number, default: 0 }, numberOfRatings: { type: Number, default: 0 } },
    ratingValue: { type: Number, default: 0 },
});
