import { apiURL } from "../../App";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Toast from "../../components/Toast/Toast";
import Loader from "../../components/Loader/Loader";
import { Box, Typography } from "@mui/material";
import ProblemCard from "../Report/ProblemCard";
import { Problem } from "../Report/ProblemCard";
import AdminProblemCard from "./AdminProblemCard";
import { Container } from "@mui/system";

const ManageReports = () => {
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
            const res = await axios.get(apiURL + "/get_all_reported_problems");
            setProblems(
                res.data
                    .sort((a: Problem, b: Problem) => {
                        if (a.status === "unseen") return 1;
                        if (a.status === "pending") return 0;
                        return -1;
                    })
                    .reverse()
            );
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

    useEffect(() => {
        console.log(problems);
    }, [problems]);

    if (loading) return <Loader open={loading} />;
    return (
        <>
            {problems.length === 0 && (
                <Typography variant="h6">No Reported Problems Yet</Typography>
            )}

            <Toast alert={alert} setAlert={setAlert} />
            <Container>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, 25rem)",
                        gap: "1rem",
                    }}
                >
                    {problems.map((problem: Problem) => {
                        return (
                            <AdminProblemCard
                                problem={problem}
                                setProblems={setProblems}
                            />
                        );
                    })}
                </Box>
            </Container>
        </>
    );
};

export default ManageReports;
