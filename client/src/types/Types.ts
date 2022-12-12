type Review = {
    reviewer: string;
    review: string;
    rating: Number;
};

type Exercise = {
    question: string;
    answers: string[];
    correctAnswer: Number;
};

type Section = {
    name: string;
    description: string;
    totalHours: Number;
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
        totalHours: Number;
        price: Number;
        rating: {
            sumOfRatings: Number;
            numberOfRatings: Number;
        };
        reviews: Review[];
        instructor: any;
        videoPreviewUrl: string;
        discount: { rate: Number; startDate: Date; endDate: Date };
    };
    sections: Section[];
};

export type { Review, Exercise, Section, Course };
