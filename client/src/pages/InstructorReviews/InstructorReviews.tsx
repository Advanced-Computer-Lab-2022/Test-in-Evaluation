import { Box, Card, Rating, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { apiURL, UserContext } from "../../App";
import { Loader } from "../../components";

type Review = {
    _id: string;
    text: string;
    score: number;
    reviewer: string;
    reviewed: string;
    reviewerName: string;
};
const InstructorReviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { userInfo } = useContext(UserContext);
    const getInstructorReviews = async () => {
        try {
            setLoading(true);
            const res = await axios.post(
                apiURL + "/get_all_reviews",
                { reviewed: userInfo.user._id },
                { withCredentials: true }
            );
            setReviews(res.data);
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        getInstructorReviews();
    }, []);
    if (loading) {
        <Loader open={loading} />;
    }
    return (
        <>
            <Box>
                {reviews.map((review) => (
                    <Card sx={{ padding: "5px" }}>
                        <Typography variant="h6">
                            {review.reviewerName}
                        </Typography>
                        <Typography>{review.text}</Typography>
                        <Rating
                            name="read-only"
                            value={review.score}
                            readOnly
                        />
                    </Card>
                ))}
            </Box>
        </>
    );
};

export default InstructorReviews;
