import "dotenv-safe/config";
import "./mongo";
import express from "express";
import session from "express-session";
import { defaultCookieMiddleware } from "./middleware/defaultCookie";
import { addRoutes } from "./routes/addRoutes";
import { store } from "./sessionStore";

const app = express();

app.use(
    session({
        secret: process.env.SECRET!,
        cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week in milliseconds
        store,
    })
);
app.use(defaultCookieMiddleware);

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded());

addRoutes(app);

const port = process.env.PORT!;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
