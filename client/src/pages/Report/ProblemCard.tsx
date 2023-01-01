import { Box, Card, CardContent, Typography } from "@mui/material";
import FollowUpModal from "./FollowUpModal";
export type Comment = {
    _id: string;
    text: string;
    senderId: string;
};
export type Problem = {
    _id: string;
    title: string;
    description: string;
    type: string;
    createdAt: string;
    status: string;
    user: string;
    comments: Comment[];
};
type Props = {
    problem: Problem;
};

const ProblemCard = ({ problem }: Props) => {
    console.log(problem);
    return (
        <Card>
            <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                <Typography variant="body1">{problem.description}</Typography>
                {problem.status !== "resolved" && (
                    <FollowUpModal problem={problem} />
                )}
            </CardContent>
        </Card>
    );
};

export default ProblemCard;
