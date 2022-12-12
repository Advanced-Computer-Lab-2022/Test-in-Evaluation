import { Box } from "@mui/material";
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
    return (
        <>
            <Loader open={loading} />
            <Box>{reviews.map((review) => review.text)}</Box>
        </>
    );
};

export default InstructorReviews;
