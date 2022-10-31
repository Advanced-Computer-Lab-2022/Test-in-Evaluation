import ProfileAdministratorPage from "../ProfileAdministrator/ProfileAdministratorPage";
import ProfileInstructorPage from "../ProfileInstructor/ProfileInstructorPage";

import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";

function ProfilePage() {
    const userState = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userState.loggedIn) {
            navigate("/signin");
        }
    }, []);

    return (
        <>
            {userState.userType === "admin" && <ProfileAdministratorPage />}
            {userState.userType === "instructor" && <ProfileInstructorPage />}
        </>
    );
}

export default ProfilePage;
