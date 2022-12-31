import { Enrollment, Section } from "../mongo";

export const getCompletedCourseRatio = async (enrollmentId: string) => {
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) throw new Error("Enrollment not found");
    const sections = await Section.find({ parentCourse: enrollment.courseId });

    let total = 0,
        count = 0;
    for (const section of sections) {
        total++;
        if (enrollment.completedVideos.some((v) => v.sectionId === section._id))
            count++;

        for (const [index, exercise] of section.exam!.exercises.entries()) {
            total++;
            if (
                enrollment.completedExercises.some(
                    ({ sectionId, exerciseIdx }) =>
                        sectionId?.toString() === section._id.toString() &&
                        exerciseIdx === index
                )
            ) {
                count++;
            }
        }
    }

    return [count, total] as const;
};
