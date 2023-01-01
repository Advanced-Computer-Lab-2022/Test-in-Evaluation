import { Console } from "console";
import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, Section } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/get_course" as const;

const Input = Record({
    courseId: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            console.log("GET COURSES BACKEND");
            console.log(req.body);
            const { courseId } = req.body;

            const [course, sections] = await Promise.all([
                Course.findById(courseId)
                    .populate("instructor")
                    .populate("subjectId"),
                Section.find({ parentCourse: courseId }),
            ]);

            // increment course views count
            await Course.updateOne(
                { _id: courseId },
                { $inc: { viewsCount: 1 } }
            );

            res.send({
                course: course!.toObject(),
                sections: sections
                    .map((v) => v.toObject()!)
                    .sort((a, b) => a.index! - b.index!),
            });
            return;
        }
    );
};
