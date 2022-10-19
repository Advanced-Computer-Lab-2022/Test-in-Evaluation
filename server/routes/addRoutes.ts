import { Express } from "express";
import { addRoute as loginAddRoute } from "./login";
import { addRoute as logoutAddRoute } from "./logout";
import { addRoute as changeCurrentPasswordAddRoute } from "./changeCurrentPassword";

export const addRoutes = (app: Express) => {
    // list addRoutes of routes
    loginAddRoute(app);
    logoutAddRoute(app);
    changeCurrentPasswordAddRoute(app);
};
