import { Cookie } from "../types/cookies";

export const defaultCookieGenerator = (): Cookie => ({
    userType: null,
    country: undefined,
});
