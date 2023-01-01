import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, Section } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/get_course_preview" as const;

const Input = Record({
    courseId: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const { courseId } = req.body;

            const [course, sections] = await Promise.all([
                Course.findById(courseId),
                Section.find({ parentCourse: courseId }),
            ]);

            res.send({
                course: course!.toObject(),
                sections: sections.map((v) => v.toObject()),
            });
            return;
        }
    );
};
