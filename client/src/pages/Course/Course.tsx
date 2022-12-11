import { apiURL, UserContext } from "../../App";
import { useContext, useReducer } from "react";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type Course = {
    title: String;
    subject: String;
    summary: String;
    totalHours: Number;
    price: Number;
    rating: {
        sumOfRatings: Number;
        numberOfRatings: Number;
    };
    reviews: [
        {
            reviewer: String;
            review: String;
            rating: Number;
        }
    ];
    instructor: String;
    videoPreviewUrl: String;
    discount: { rate: Number; startDate: Date; endDate: Date };
};

const Course = () => {
    const { userInfo } = useContext(UserContext);
    const [course, setCourse] = React.useState<Course>();

    const { courseId } = useParams();

    React.useEffect(() => {
        axios
            .get(`${apiURL}/get_course/${courseId}`)
            .then((res) => {
                setCourse(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <div>
                <h1>{course?.title}</h1>
                <h2>{course?.subject}</h2>
                <h3>{course?.summary}</h3>
            </div>
        </div>
    );
};

export default Course;
