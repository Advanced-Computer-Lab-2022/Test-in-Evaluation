import { Express } from "express";
import { Array, Number, Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, Section, User, Subject } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/set_subtitle_exercise" as const;

const Input = Record({
    courseId: String,
    sectionId: String,
    exercises: Array(
        Record({
            question: String,
            answers: Array(String),
            correctAnswer: Number,
        })
    ),
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            if (req.session.data.userType !== UserTypes.instructor)
                return res.status(400).send({ error: "unauthorized" });
            const { courseId, sectionId, exercises } = req.body;

            const section = await Section.findById(sectionId);
            if (!section)
                return res.status(400).send({ error: "section not found" });
            if (section.parentCourse?.toString() !== courseId)
                return res.status(400).send({ error: "course error" });

            section.exam = {
                exercises: exercises,
            };

            await section.save();
            res.send({ success: true });
        }
    );
};
