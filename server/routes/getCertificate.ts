import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, Enrollment, Section, User } from "../mongo";
import { Request, Response } from "../types/express";
import { generateCompletionCertificationDocument } from "../utils/generateCompletionCertificationDocument";

const path = "/api/get_certificate" as const;

const Input = Record({});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.get(path, validateInput(Input), async (req: Request<Input>, res: Response) => {
        const { enrollmentId } = req.query;
        if (typeof enrollmentId !== "string") return res.status(400).send("Invalid enrollmentId");

        // allow anyone to generate a certificate, so email links work
        const enrollment = await Enrollment.findById(enrollmentId);
        if (!enrollment) return res.status(404).send("Enrollment not found");
        const sections = await Section.find({ parentCourse: enrollment.courseId });
        const isEnrollmentComplete = sections.every(({ _id, exam }) =>
            exam!.exercises.every((_, idx) => enrollment.completedSections.some(({ sectionId, exerciseIdx }) => sectionId?.toString() === _id.toString() && exerciseIdx === idx))
        );
        if (!isEnrollmentComplete) return res.status(404).send("Enrollment not complete");

            const course = await Course.findById(enrollment.courseId);
            if (!course) return res.status(404).send("Course not found");

            const student = await User.findById(enrollment.studentId);
            if (!student) return res.status(404).send("Student not found");

            const studentName = `${student.firstName ?? ""} ${
                student.lastName ?? ""
            }`.trim();
            const courseName = course.title ?? "";
            const doc = generateCompletionCertificationDocument(
                studentName,
                courseName
            );

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${courseName} Completion Certificate.pdf"`
            );
            doc.pipe(res);
            doc.end();
        }
    );
};
