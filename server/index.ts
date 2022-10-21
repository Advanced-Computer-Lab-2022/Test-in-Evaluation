import "dotenv-safe/config";
import "./Model";
import Express from 'express';
import {getFilteredCourses} from './Controller/getFilteredCourses';

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded());

app.get("/courses", getFilteredCourses);