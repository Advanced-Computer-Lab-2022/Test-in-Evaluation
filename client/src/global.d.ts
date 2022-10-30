export type course = {
    title: string;
    subject: string;
    summary: string;
    totalHours: number;
    price: number;
    rating: {
        sumOfRatings: number;
        numberOfRatings: number;
    };
    instructor: string;
};
