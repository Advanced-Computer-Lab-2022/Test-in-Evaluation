import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import Navbar from "./components/NavBar/NavBar";
import {
    Home,
    SignIn,
    SignUp,
    CourseList,
    SearchResult,
    Profile,
    CreateCourse,
    Contract,
    Course,
    Instructor,
    CourseCollectionPage,
} from "./pages";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { LoginProtected, ContractProtected, Quiz } from "./components";
import axios from "axios";
import { User } from "./../src/types/Types";
// import { AnyAction } from "redux";

axios.defaults.withCredentials = true;

type userState = {
    loggedIn: boolean;
    userType: string;
    userInfo: {
        type: "individualTrainee" | "instructor" | "corporateTrainee" | "admin";
        username: string;
        acceptedContract: boolean;
        isGuest: boolean;
        user: User;
    };
    country: string;
    searchTitles: boolean;
    searchSubjects: boolean;
    searchInstructor: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    setUserType: Dispatch<SetStateAction<string>>;
    setUserInfo: Dispatch<SetStateAction<any>>;
    setCountry: Dispatch<SetStateAction<string>>;
    setSearchTitles: Dispatch<SetStateAction<boolean>>;
    setSearchSubjects: Dispatch<SetStateAction<boolean>>;
    setSearchInstructor: Dispatch<SetStateAction<boolean>>;
    updateUserInfo: () => void;
};

const UserContext = createContext({} as userState);
// const navigate = useNavigate();
// navigate('INSERT PATH HERE')

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userType, setUserType] = useState("guest");
    const [country, setCountry] = useState("Egypt");
    const [userInfo, setUserInfo] = useState("" as any);
    const [searchTitles, setSearchTitles] = useState(true);
    const [searchSubjects, setSearchSubjects] = useState(true);
    const [searchInstructor, setSearchInstructor] = useState(true);

    const updateUserInfo = () => {
        axios
            .get(apiURL + "/who_am_i", { withCredentials: true })
            .then((res) => {
                if (!res.data.isGuest) {
                    setLoggedIn(true);
                    setUserType(res.data.type);
                    setUserInfo(res.data);
                }
            });
    };

    useEffect(() => {
        axios
            .get(apiURL + "/who_am_i", { withCredentials: true })
            .then((res) => {
                if (!res.data.isGuest) {
                    setLoggedIn(true);
                    setUserType(res.data.type);
                    setUserInfo(res.data);
                }
            });
    }, []);

    return (
        <UserContext.Provider
            value={{
                loggedIn,
                userType,
                userInfo,
                country,
                searchTitles,
                searchSubjects,
                searchInstructor,
                setLoggedIn,
                setUserType,
                setUserInfo,
                setCountry,
                setSearchTitles,
                setSearchSubjects,
                setSearchInstructor,
                updateUserInfo,
            }}
        >
            <div className="App">
                <BrowserRouter>
                    <Navbar />
                    <div style={{ width: "100%", height: "100%" }}>
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/signin" element={<SignIn />}></Route>
                            <Route
                                path="/forgot_password"
                                element={<ForgotPassword />}
                            ></Route>
                            <Route path="/signup" element={<SignUp />}></Route>
                            <Route
                                path="/courses"
                                element={<CourseList />}
                            ></Route>
                            <Route
                                path="/search"
                                element={<SearchResult />}
                            ></Route>
                            <Route
                                path="/course_collection"
                                element={<CourseCollectionPage />}
                            ></Route>
                            <Route>
                                <Route
                                    path="/course/:courseId"
                                    element={<Course />}
                                ></Route>
                                <Route
                                    path="/instructor/:instructorId"
                                    element={<Instructor />}
                                ></Route>
                                <Route element={<ContractProtected />}>
                                    <Route
                                        path="/createCourse"
                                        element={<CreateCourse />}
                                    ></Route>
                                    <Route
                                        path="/profile"
                                        element={<Profile />}
                                    ></Route>
                                </Route>
                                <Route
                                    path="/contract"
                                    element={<Contract />}
                                ></Route>
                            </Route>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </UserContext.Provider>
    );
}

const apiURL = "http://localhost:8000/api";

export { apiURL, UserContext };
export default App;
