import "dotenv-safe/config";
import "./mongo";
import express from "express";
import session from "express-session";
import { defaultCookieMiddleware } from "./middleware/defaultCookie";
import { addRoutes } from "./routes/addRoutes";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(
    session({
        secret: process.env.SECRET!,
    })
);
app.use(defaultCookieMiddleware);

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded());

addRoutes(app);

const port = process.env.PORT!;

mongoose.connect(process.env.MONGODB_URI!).then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
