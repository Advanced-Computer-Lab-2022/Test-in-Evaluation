export type Course = {
    _id: string;
    title: string;
    subject: string;
    summary: string;
    totalHours: number;
    price: number;
    rating: {
        sumOfRatings: number;
        numberOfRatings: number;
    };
    instructor: { _id: string; username: string };
};
