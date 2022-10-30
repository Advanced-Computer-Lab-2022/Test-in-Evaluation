import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import {
    Home,
    SignIn,
    SignUp,
    CourseList,
    SearchResult,
    Profile,
} from "./pages";

import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();
// navigate('INSERT PATH HERE')

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div style={{ width: "100%", height: "100%" }}>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/signin" element={<SignIn />}></Route>
                        <Route path="/signup" element={<SignUp />}></Route>
                        <Route path="/courses" element={<CourseList />}></Route>
                        <Route
                            path="/search"
                            element={<SearchResult />}
                        ></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
