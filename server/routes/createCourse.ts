import { Express } from "express";
import { Array, Number, Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, Section, User, Subject } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/create_course" as const;

const section = Record({
    title: String,
    description: String,
    totalHours: Number,
    videoUrl: String,
    exam: Record({
        exercises: Array(
            Record({
                question: String,
                answers: Array(String),
                correctAnswer: Number,
            }).withConstraint((excercise) => excercise.answers.length > 1 && typeof excercise.answers[excercise.correctAnswer] === "string")
        ),
    }),
});

const Input = Record({
    title: String,
    subject: String,
    summary: String,
    price: Number,
    sections: Array(section).withConstraint((sections) => sections.length > 0),
    videoPreviewUrl: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        if (req.session.data.userType !== UserTypes.instructor) return res.status(400).send({ error: "unauthorized" });

        const { price, sections, subject, summary, title, videoPreviewUrl } = req.body;
        const totalHours = sections.map((v) => v.totalHours).reduce((a, b) => a + b);
        const instructorId = await User.findOne({
            username: req.session.data.username,
        }).then((v) => v?._id);
        const subjectId = subject ? await Subject.findOneAndUpdate({ Name: subject }, { upsert: true }).then((v) => v?._id) : undefined;
        const course = await Course.create({
            price,
            subjectId: subjectId,
            summary,
            title,
            totalHours,
            instructor: instructorId!,
            videoPreviewUrl,
        });

        await Promise.all(
            sections.map(({ description, title, totalHours }) =>
                Section.create({
                    description,
                    name: title,
                    parentCourse: course._id,
                    totalHours,
                })
            )
        );

        return res.send({ ok: true });
    });
};
