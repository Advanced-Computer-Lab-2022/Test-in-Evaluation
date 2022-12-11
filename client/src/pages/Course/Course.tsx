import { apiURL, UserContext } from "../../App";
import { useContext, useReducer } from "react";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type Course = {
    course: {
        title: String;
        subjectId: {
            Name: String;
        };
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
    sections: {
        name: String;
        description: String;
        totalHours: Number;
        videoUrl: String;
        exam: {
            exercises: [
                { question: String; answers: [String]; correctAnswer: Number }
            ];
        };
    }[];
};

const Course = () => {
    const { userInfo } = useContext(UserContext);
    const [course, setCourse] = React.useState<Course>();

    const { courseId } = useParams();

    React.useEffect(() => {
        axios
            .post(
                `${apiURL}/get_course`,
                { courseId: courseId },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.dir(res);
                setCourse(res.data);
            });
    }, []);

    return (
        <div>
            <div>
                <h1>{course?.course.title}</h1>
                <h2>{course?.course.subjectId.Name}</h2>
                <h3>{course?.course.summary}</h3>
            </div>
        </div>
    );
};

export default Course;
