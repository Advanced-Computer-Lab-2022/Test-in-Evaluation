import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { apiURL } from "../../App";
import { Loader, Toast } from "../../components";
import ProblemCard from "../Report/ProblemCard";
export type Problem = {
    _id: string;
    title: string;
    description: string;
    type: string;
    createdAt: string;
    status: string;
};
type Props = {
    problem: Problem;
    setProblems: (problem: any) => void;
};
const AdminProblemCard = ({ problem, setProblems }: Props) => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });
    const resolveProblem = async () => {
        try {
            setLoading(true);
            const res = await axios.post(apiURL + "/mark_reported_problem", {
                reportedProblemId: problem._id,
                newStatus: "resolved",
            });
            setProblems((prev: Problem[]) =>
                prev.map((p) => {
                    if (p._id === problem._id) {
                        return { ...p, status: "resolved" };
                    }
                    return p;
                })
            );

            setAlert({
                isSuccess: true,
                isError: false,
                message: "Problem Resolved Successfully",
            });
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

    const markPending = async () => {
        try {
            setLoading(true);
            const res = await axios.post(apiURL + "/mark_reported_problem", {
                reportedProblemId: problem._id,
                newStatus: "pending",
            });

            setAlert({
                isSuccess: true,
                isError: false,
                message: "Problem Marked Pending",
            });
            setLoading(false);
            setProblems((prev: Problem[]) =>
                prev.map((p) => {
                    if (p._id === problem._id) {
                        return { ...p, status: "pending" };
                    }
                    return p;
                })
            );
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

    // if (loading) return <Loader open={loading} />;
    return (
        <>
            <Toast alert={alert} setAlert={setAlert} />
            <Card sx={{ height: "fit-content" }}>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h5">{problem.title}</Typography>

                        <Typography variant="body1">
                            Status:{" "}
                            <Box
                                component="span"
                                sx={{
                                    color:
                                        problem.status === "unseen"
                                            ? "red"
                                            : problem.status === "pending"
                                            ? "orange"
                                            : "green",
                                    fontWeight: "bold",
                                    fontStyle: "italic",
                                    textTransform: "capitalize",
                                }}
                            >
                                {problem.status}
                            </Box>
                        </Typography>
                    </Box>
                    <Typography variant="body1">
                        {problem.description}
                    </Typography>
                    {problem.status !== "resolved" && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                onClick={resolveProblem}
                            >
                                Resolve
                            </Button>
                            {problem.status === "unseen" && (
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={markPending}
                                >
                                    Mark Pending
                                </Button>
                            )}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default AdminProblemCard;
