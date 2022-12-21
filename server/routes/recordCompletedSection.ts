import { Express } from "express";
import { Schema } from "mongoose";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Enrollment, Section, User } from "../mongo";
import { Request, Response } from "../types/express";

const path = "/api/record_completed_section" as const;

const Input = Record({
    sectionId: String,
});

type Input = Static<typeof Input>;

// to be called from the front-end when a student completes a section
export const addRoute = (app: Express) => {
    app.post(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const userSession = req.session.data;
        if (!userSession.userType) return res.status(401).send("Unauthorized");

        const { sectionId } = req.body;
        const section = await Section.findById(sectionId);
        if (!section) return res.status(400).send("Section doesn't exist");
        const courseId = section.parentCourse!;

        const user = (await User.findOne({ username: userSession.username }))!;

        const enrollment = await Enrollment.findOne({ courseId, studentId: user._id });
        if (!enrollment) return res.status(400).send("Enrollment doesn't exist");

        // if not already completed mark as completed
        if (!enrollment.completedSections.map(({ sectionId }) => sectionId?.toString()).includes(sectionId)) {
            await Enrollment.updateOne({ _id: enrollment._id }, { $push: { completedSections: { sectionId } } });
        }

        res.send({ success: true });
    });
};
