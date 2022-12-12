type Review = {
    reviewer: String;
    review: String;
    rating: Number;
};

type Excersize = {
    question: String;
    answers: [String];
    correctAnswer: Number;
};

type Section = {
    name: String;
    description: String;
    totalHours: Number;
    videoUrl: String;
    exam: {
        exercises: Excersize[];
    };
};

type Course = {
    course: {
        title: String;
        subjectId: {
            Name: String;
        };
        summary: String;
        totalHours: Number;
        price: Number;
        rating: {
            sumOfRatings: Number;
            numberOfRatings: Number;
        };
        reviews: Review[];
        instructor: any;
        videoPreviewUrl: String;
        discount: { rate: Number; startDate: Date; endDate: Date };
    };
    sections: Section[];
};

export type { Review, Excersize, Section, Course };
