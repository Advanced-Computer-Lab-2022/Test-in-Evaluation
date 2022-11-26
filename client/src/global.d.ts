export type Course = {
    _id: string;
    title: string;
    subjectId: { Name: string };
    summary: string;
    totalHours: number;
    price: number;
    rating: {
        sumOfRatings: number;
        numberOfRatings: number;
    };
    instructor: { _id: string; username: string };
};
export type UserInfo = {
    type?: string;
    username?: string;
    isGuest: boolean;
    acceptedContract?: boolean;
};
