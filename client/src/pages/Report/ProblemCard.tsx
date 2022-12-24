import { Card, CardContent, Typography } from "@mui/material";
type Problem = {
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
                <Typography variant="h5">{problem.title}</Typography>
                <Typography variant="body1">{problem.description}</Typography>
                <Typography variant="body1">{problem.type}</Typography>
                <Typography variant="body1">{problem.createdAt}</Typography>
                <Typography variant="body1">{problem.status}</Typography>
            </CardContent>
        </Card>
    );
};

export default ProblemCard;
