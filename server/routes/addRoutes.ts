import { Express } from "express";
import { addRoute as setCountryAddRoute } from "./setCountry";
import { addRoute as whoAmIAddRoute } from "./whoAmI";
import { addRoute as searchCoursesAddRoute } from "./searchCourses";
import { addRoute as createUserAddRoute } from "./createUser";
import { addRoute as createCourseAddRoute } from "./createCourse";
import { addRoute as getCoursePreviewAddRoute } from "./getCoursePreview";
import { addRoute as loginAddRoute } from "./login";
import { addRoute as logoutAddRoute } from "./logout";
import { addRoute as changeCurrentPasswordAddRoute } from "./changeCurrentPassword";
import { addRoute as signUpAddRoute } from "./signUp";
import { addRoute as createSubjectAddRoute } from "./createSubject";
import { addRoute as deleteSubjectAddRoute } from "./deleteSubject";
import { addRoute as getAllSubjectsAddRoute } from "./getAllSubjects";
import { addRoute as getAllInstructorsAddRoute } from "./getAllInstructors";

export const addRoutes = (app: Express) => {
    // list addRoutes of routes
    setCountryAddRoute(app);
    whoAmIAddRoute(app);
    searchCoursesAddRoute(app);
    createUserAddRoute(app);
    createCourseAddRoute(app);
    getCoursePreviewAddRoute(app);
    loginAddRoute(app);
    logoutAddRoute(app);
    changeCurrentPasswordAddRoute(app);
    signUpAddRoute(app);
    createSubjectAddRoute(app);
    deleteSubjectAddRoute(app);
    getAllSubjectsAddRoute(app);
    getAllInstructorsAddRoute(app);
};