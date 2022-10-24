import "dotenv-safe/config";
import "./Model";
import express from "express";
import session from "express-session";
import { defaultCookieMiddleware } from "./middleware/defaultCookie";
import { addRoutes } from "./routes/addRoutes";

const app = express();

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
