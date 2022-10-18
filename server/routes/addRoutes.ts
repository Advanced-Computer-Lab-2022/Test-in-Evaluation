import { Express } from "express";
import { addRoute as setCountryAddRoute } from "./setCountry";
import { addRoute as whoAmIAddRoute } from "./whoAmI";
import { addRoute as searchCoursesAddRoute } from "./searchCourses";
import { addRoute as createUserAddRoute } from "./createUser";
import { addRoute as createCourseAddRoute } from "./createCourse";
import { addRoute as getCoursePreviewAddRoute } from "./getCoursePreview";

export const addRoutes = (app: Express) => {
    // list addRoutes of routes
    setCountryAddRoute(app);
    whoAmIAddRoute(app);
    searchCoursesAddRoute(app);
    createUserAddRoute(app);
    createCourseAddRoute(app);
    getCoursePreviewAddRoute(app);
};
