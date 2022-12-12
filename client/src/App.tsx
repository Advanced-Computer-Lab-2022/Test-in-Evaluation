import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createContext, Dispatch, SetStateAction, useState } from "react";
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
} from "./pages";
import { LoginProtected, ContractProtected } from "./components";
// import { AnyAction } from "redux";

type userState = {
    loggedIn: boolean;
    userType: string;
    userInfo: any;
    country: string;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    setUserType: Dispatch<SetStateAction<string>>;
    setUserInfo: Dispatch<SetStateAction<any>>;
    setCountry: Dispatch<SetStateAction<string>>;
};

const UserContext = createContext({} as userState);
// const navigate = useNavigate();
// navigate('INSERT PATH HERE')

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userType, setUserType] = useState("none");
    const [country, setCountry] = useState("Egypt");
    const [userInfo, setUserInfo] = useState("" as any);

    console.log();

    return (
        <UserContext.Provider
            value={{
                loggedIn,
                userType,
                userInfo,
                country,
                setLoggedIn,
                setUserType,
                setUserInfo,
                setCountry,
            }}
        >
            <div className="App">
                <BrowserRouter>
                    <Navbar />
                    <div style={{ width: "100%", height: "100%" }}>
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/signin" element={<SignIn />}></Route>
                            <Route path="/signup" element={<SignUp />}></Route>
                            <Route
                                path="/courses"
                                element={<CourseList />}
                            ></Route>
                            <Route
                                path="/search"
                                element={<SearchResult />}
                            ></Route>
                            <Route element={<LoginProtected />}>
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
