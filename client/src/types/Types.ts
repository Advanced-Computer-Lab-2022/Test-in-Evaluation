type User = {
    _id: string;
    username: string;
    userType: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    bio: string;
};

type Review = {
    reviewer: string;
    review: string;
    rating: number;
};

type Exercise = {
    question: string;
    answers: string[];
    correctAnswer: number;
};

type Section = {
    _id: string;
    name: string;
    description: string;
    totalHours: number;
    videoUrl: string;
    exam: {
        exercises: Exercise[];
    };
};

type Course = {
    title: string;
    subjectId: {
        Name: string;
    };
    summary: string;
    totalHours: number;
    price: number;
    rating: {
        sumOfRatings: number;
        numberOfRatings: number;
    };
    reviews: Review[];
    instructor: User;
    videoPreviewUrl: string;
    discount: { rate: number; startDate: Date; endDate: Date };
    _id: string;
    viewsCount: number;
};

type CourseWithSections = {
    course: Course;
    sections: Section[];
};

type ExerciseSolution = {
    _id: string;
    section: string;
    user: string;
    solutions: number[];
};

enum EnrollmentStatusType {
    pending = "pending",
    accepted = "accepted",
    rejected = "rejected",
    canceled = "canceled",
}
type Enrollment = {
    status: EnrollmentStatusType;
    courseId: Course;
    studentId: string;
    amountPaid: Number;
    paymentDate: Date;
    completedSections: string[];
};

export type {
    Review,
    Exercise,
    Section,
    Course,
    CourseWithSections,
    ExerciseSolution,
    User,
    Enrollment,
};
