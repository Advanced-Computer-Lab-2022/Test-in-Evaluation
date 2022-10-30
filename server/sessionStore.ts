import MongoStore from "connect-mongo";

export const store = MongoStore.create({ mongoUrl: process.env.MONGODB_URI! });
