import { Box, Card, CardContent, Typography } from "@mui/material";
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
};
const ProblemCard = ({ problem }: Props) => {
    return (
        <Card>
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5">{problem.title}</Typography>
                    {/* <Box
                        sx={{
                            background:
                                problem.status === "unseen"
                                    ? "red"
                                    : problem.status === "pending"
                                    ? "yellow"
                                    : "green",
                            borderRadius: "100vmax",
                            padding: "0 0.5rem",
                            width: "fit-content",
                            display: "grid",
                            placeItems: "center",
                        }}
                    > */}
                    <Typography
                        variant="body1"
                        // fontStyle="italic"
                        // fontWeight="bold"
                    >
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
                    {/* </Box> */}
                </Box>
                <Typography variant="body1">{problem.description}</Typography>
            </CardContent>
        </Card>
    );
};

export default ProblemCard;
