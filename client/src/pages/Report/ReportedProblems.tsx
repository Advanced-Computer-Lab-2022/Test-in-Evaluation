import { apiURL } from "../../App";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Toast from "../../components/Toast/Toast";
import Loader from "../../components/Loader/Loader";
import { Box, Typography } from "@mui/material";
import ProblemCard from "./ProblemCard";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Problem } from "./ProblemCard";

const ReportedProblems = () => {
    const user = useContext(UserContext);
    const id = user.userInfo.user._id;
    const [problems, setProblems] = useState([]);
    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const getReportedProblems = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                apiURL + "/getMyReportedProblems/" + id
            );
            setProblems(res.data);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setAlert({
                isSuccess: false,
                isError: true,
                message:
                    ((error as AxiosError)?.response?.data as string) ||
                    error?.toString() ||
                    "Server Error Please Try Again Later",
            });
        }
    };
    useEffect(() => {
        getReportedProblems();
    }, []);
    if (loading) return <Loader open={loading} />;
    return (
        <>
            {problems.length === 0 && (
                <Typography variant="h6">No Reported Problems Yet</Typography>
            )}

            <Toast alert={alert} setAlert={setAlert} />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, 25rem)",
                    gap: "1rem",
                }}
            >
                {problems.map((problem: Problem) => {
                    return <ProblemCard key={problem?._id} problem={problem} />;
                })}
            </Box>
        </>
    );
};

export default ReportedProblems;
