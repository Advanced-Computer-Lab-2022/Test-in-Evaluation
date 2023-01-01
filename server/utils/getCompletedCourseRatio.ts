import { Enrollment, Section } from "../mongo";

export const getCompletedCourseRatio = async (enrollmentId: string) => {
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) throw new Error("Enrollment not found");
    const sections = await Section.find({ parentCourse: enrollment.courseId });

    let total = 0,
        count = 0;

    for (const section of sections) {
        total += 2;
        if (
            enrollment.completedVideos.some(
                (v) => v.sectionId?.toString() === section._id?.toString()
            )
        )
            count++;

        if (
            enrollment.completedExercises.some(
                (v) => v.sectionId?.toString() === section._id?.toString()
            )
        )
            count++;
    }

    return [count, total] as const;
};
