import { Express } from "express";
import { addRoute as loginAddRoute } from "./login";
import { addRoute as logoutAddRoute } from "./logout";

export const addRoutes = (app: Express) => {
    // list addRoutes of routes
    loginAddRoute(app);
    logoutAddRoute(app);
};
