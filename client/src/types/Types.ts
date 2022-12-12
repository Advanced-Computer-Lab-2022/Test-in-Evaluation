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
    course: {
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
        instructor: any;
        videoPreviewUrl: string;
        discount: { rate: number; startDate: Date; endDate: Date };
        _id: string;
    };
    sections: Section[];
};

type ExerciseSolution = {
    _id: string;
    section: string;
    user: string;
    solutions: number[];
};

export type { Review, Exercise, Section, Course, ExerciseSolution };
