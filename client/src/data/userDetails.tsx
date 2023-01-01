import { useContext } from "react";
import { apiURL, UserContext } from "../App";

const getUserType = () => {
    const userContext = useContext(UserContext);
    return userContext.userType;
};

const getUserInfo = () => {
    const userContext = useContext(UserContext);
    return userContext.userInfo;
};

const isUserLoggedIn = (): boolean => {
    const userContext = useContext(UserContext);
    return userContext.loggedIn;
};

export { getUserType, getUserInfo, isUserLoggedIn };
