import { UserTypes } from "./user";

export interface GuestCookie {
    userType: null;
    country: string | undefined;
}

export interface InstructorCookie {
    userType: UserTypes.instructor;
    username: string;
    // id: string;
}

export interface IndividualTraineeCookie {
    userType: UserTypes.individualTrainee;
    username: string;
    // id: string;
}

export interface CorporateTraineeCookie {
    userType: UserTypes.corporateTrainee;
    username: string;
    // id: string;
}

export interface AdminCookie {
    userType: UserTypes.admin;
    username: string;
    // id: string;
}

export type Cookie = GuestCookie | InstructorCookie | IndividualTraineeCookie | CorporateTraineeCookie | AdminCookie;
