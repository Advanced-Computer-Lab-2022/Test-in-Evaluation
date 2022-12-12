import { Schema } from "mongoose";
import { UserTypes, GenderTypes } from "../types/user";

export const UserSchema = new Schema({
  username: { type: String, unique: true },
  firstName: String,
  lastName: String,
  passwordHash: String,
  bio: String,
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
  rating: {
    sumOfRatings: { type: Number, default: 0 },
    NumberOfRatings: { type: Number, default: 0 },
  },
  reviews: [
    {
      reviewerId: { type: Schema.Types.ObjectId, ref: "User" },
      review: String,
      rating: Number,
    },
  ],
  acceptedContract: { type: Boolean, default: false },
});

UserSchema.index({ email: 1 }, { unique: true });
