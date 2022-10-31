import { Express } from "express";
import { Array, Number, Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, Section, Subject, User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/create_course" as const;

const Input = Record({
    title: String,
    subject: String,
    summary: String,
    price: Number,
    sections: Array(Record({ title: String, description: String, totalHours: Number })).withConstraint((sections) => sections.length > 0),
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        if (req.session.data.userType !== UserTypes.instructor) return res.status(400).send({ error: "unauthorized" });

        const { price, sections, subject, summary, title } = req.body;
        const totalHours = sections.map((v) => v.totalHours).reduce((a, b) => a + b);
        const instructorId = await User.findOne({ username: req.session.data.username }).then((v) => v?._id);

        const subjectId = await Subject.create({ Name: subject });

        const course = await Course.create({ price, subjectId, summary, title, totalHours, instructor: instructorId! });

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
