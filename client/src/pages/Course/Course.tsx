import { apiURL, UserContext } from "../../App";
import { useContext, useEffect, useReducer, useState } from "react";
import React from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    LinearProgress,
    Rating,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { GetCurrency } from "../../data/currency";
import type { CourseWithSections, Review } from "../../types/Types";
import { ExpandMore, Star, StarBorder } from "@mui/icons-material";
import Subtitle from "./Subtitle";
import Toast from "../../components/Toast/Toast";
import ReportModal from "../Report/ReportModal";
import RechargeModal from "../ProfileTraineePage/RechargeWindow/RechargeModal";

import ReactPlayer from "react-player/youtube";

// /getAllReviews
// /writeReview

/*

view course preview video
view course subtitles

view overall totalhours

view reviews
view ratings
view instructor
rate course
review course


view subtitle name
view subtitle totalhours
solve subtitle excersise
view course subtitles video

*/

const SubmitRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#000000",
    },
    "& .MuiRating-iconHover": {
        color: "#000000",
    },
});

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ffffff",
    },
    "& .MuiRating-iconHover": {
        color: "#eeeeee",
    },
});

type CourseProgress = {
    count: number;
    total: number;
};

const CoursePage = () => {
    const { userInfo, updateUserInfo } = useContext(UserContext);
    const [course, setCourse] = React.useState<CourseWithSections>();
    const { courseId } = useParams();
    const [rating, setRating] = useState<number | null>(2.5);
    const [review, setReview] = useState<string | null>("");
    const [courseReviews, setCourseReviews] = useState<any[]>([] as any[]);
    const [courseRating, setCourseRating] = useState(0);

    const [enrollmentId, setEnrollmentId] = useState("");

    const [courseProgress, setCourseProgress] = useState<CourseProgress>({
        count: 0,
        total: 1,
    });

    const [enrollStatus, setEnrollStatus] = useState<string | null>(null);
    const updateEnrolledStatus = () => {
        axios
            .post(`${apiURL}/get_is_enrolled`, {
                courseId: courseId!,
            })
            .then((res) => {
                setEnrollStatus(res.data.enrollStatus);
                setEnrollmentId(res.data.enrollmentId);
                updateUserInfo();
            });
    };
    useEffect(() => {
        updateEnrolledStatus();
    }, [courseId]);

    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });

    const navigate = useNavigate();

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
                setCourse(res.data);
                console.dir(res);
                const cid = res.data.course._id;
                axios
                    .post(
                        `${apiURL}/get_all_reviews`,
                        { reviewed: cid },
                        { withCredentials: true }
                    )
                    .then((result) => {
                        setCourseReviews(result.data);
                    })
                    .catch((err) => {});
            });
    }, []);

    const enrollNow = () => {
        axios
            .post(
                `${apiURL}/enroll_in_course`,
                { courseId: courseId },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    setAlert({
                        isSuccess: true,
                        isError: false,
                        message: res.data,
                    });

                    updateEnrolledStatus();
                }
            })
            .catch((err) => {
                setAlert({
                    isSuccess: false,
                    isError: true,
                    message: err.response.data,
                });
                setOpenPayment(true);
            });
    };

    const onCoursePay = () => {
        axios
            .post(apiURL + "/pay_to_wallet", {
                amount: course!.course.realPrice,
            })
            .then((res) => {
                enrollNow();
                setOpenPayment(false);
                updateEnrolledStatus();
            });
    };
    const [openPayment, setOpenPayment] = useState(false);

    const fetchCourseProgress = () => {
        axios
            .post(apiURL + "/get_completed_course_ratio", {
                courseId: courseId,
            })
            .then((res) => {
                console.log(
                    "new course progress ",
                    res.data.count,
                    res.data.total
                );
                setCourseProgress(res.data);
            });
    };

    useEffect(() => {
        fetchCourseProgress();
    }, [courseId]);

    const isEnrolled = () => {
        return enrollStatus === "accepted" || enrollStatus === "pendingRefund";
    };

    const requestRefund = () => {
        axios
            .post(apiURL + "/request_refund", {
                enrollmentId: enrollmentId,
            })
            .then((res) => {
                setAlert({
                    isSuccess: true,
                    isError: false,
                    message: res.data,
                });
                updateEnrolledStatus();
            })
            .catch((err) => {
                setAlert({
                    isSuccess: false,
                    isError: true,
                    message: err.response.data,
                });
            });
    };

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Toast alert={alert} setAlert={setAlert} />
            <RechargeModal
                amountToBeCharged={course?.course.realPrice ?? 0}
                onCompleted={onCoursePay}
                open={openPayment}
                setOpen={setOpenPayment}
            />

            <Box
                sx={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    padding: "10px",
                    backgroundColor: "white",
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "15px",
                    width: "100%",
                    maxWidth: "1400px",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "1400px",
                        display: "flex",
                        flexDirection: "row",
                        boxShadow: "0px 0px 20px 2px rgba(0.0,0.0,0.0,0.5)",
                    }}
                >
                    <Box
                        sx={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            justifyItems: "center",
                            backgroundColor: "#171718",
                            padding: "17px",
                            gap: "17px",
                            flexDirection: "column",
                        }}
                    >
                        <Box>
                            <Typography
                                style={{
                                    fontSize: "45px",
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                {course?.course.title}
                            </Typography>
                        </Box>
                        <ReactPlayer
                            style={{ aspectRatio: "16 / 9", width: "100%" }}
                            controls={true}
                            url={course?.course.videoPreviewUrl}
                        />
                        <Box>
                            <Typography sx={{ color: "white" }}>
                                {course?.course.summary}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "60%",
                                    gap: "10px",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography sx={{ color: "white" }}>
                                    <Link
                                        to={`/instructor/${course?.course.instructor._id}`}
                                        style={{ color: "white" }}
                                    >
                                        {course?.course.instructor.username}
                                    </Link>
                                </Typography>
                                <Box sx={{ display: "flex", gap: "15px" }}>
                                    <Chip
                                        sx={{
                                            backgroundColor: "white",
                                            fontWeight: "bold",
                                        }}
                                        label={course?.course.subjectId.Name}
                                    />
                                    <Chip
                                        sx={{
                                            backgroundColor: "white",
                                            fontWeight: "bold",
                                        }}
                                        label={
                                            course?.course.totalHours.toString() +
                                            " Hours"
                                        }
                                    />
                                    <Chip
                                        sx={{
                                            backgroundColor: "white",
                                            fontWeight: "bold",
                                        }}
                                        label={
                                            course?.course?.avgRating.toFixed(
                                                2
                                            ) +
                                            " " +
                                            "Rating"
                                        }
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: "40%",
                                    display: "flex",
                                    gap: "5px",
                                    flexDirection: "column",
                                }}
                            >
                                {(!isEnrolled() ||
                                    userInfo.type === "instructor") &&
                                    userInfo.type != "corporateTrainee" && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: "1rem",
                                            }}
                                        >
                                            <Typography
                                                variant="h4"
                                                sx={{ color: "white" }}
                                            >
                                                {course?.course.realPrice.toString() +
                                                    " " +
                                                    GetCurrency()}
                                            </Typography>
                                            {(course?.course?.discount?.rate ??
                                                0) > 0 && (
                                                <Typography
                                                    sx={{
                                                        fontSize: 14,
                                                        alignSelf: "center",
                                                    }}
                                                    color="green"
                                                    gutterBottom
                                                >
                                                    {(course?.course?.discount
                                                        ?.rate || 0) * 100}
                                                    % off
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                <Box>
                                    {isEnrolled() ||
                                    userInfo.type === "instructor" ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: "0.5em",
                                            }}
                                        >
                                            <ReportModal
                                                id={course?.course?._id}
                                            />
                                            {courseProgress.count /
                                                courseProgress.total <
                                                0.5 &&
                                                userInfo.type ===
                                                    "individualTrainee" && (
                                                    <Button
                                                        variant="contained"
                                                        onClick={requestRefund}
                                                    >
                                                        Refund
                                                    </Button>
                                                )}
                                        </Box>
                                    ) : (
                                        <Box>
                                            {enrollStatus !== "pending" &&
                                                userInfo.type !== "admin" &&
                                                userInfo.isGuest === false && (
                                                    <Button
                                                        variant="contained"
                                                        size="large"
                                                        sx={{ width: "100%" }}
                                                        onClick={enrollNow}
                                                    >
                                                        {userInfo.type ===
                                                        "individualTrainee"
                                                            ? "Purchase Now"
                                                            : "Enroll Now"}
                                                    </Button>
                                                )}
                                            {enrollStatus === "pending" && (
                                                <Typography
                                                    sx={{ color: "white" }}
                                                    variant="subtitle1"
                                                >
                                                    Enrollment request sent.
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "50%",
                            padding: "15px",
                            background:
                                "repeating-linear-gradient(-20deg,#171718,#171718 10px,#111 10px,#111 20px)",
                        }}
                    >
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "5px",
                                    flexDirection: "column",
                                }}
                            >
                                {isEnrolled() && (
                                    <Card>
                                        <CardContent
                                            sx={{
                                                display: "flex",
                                                gap: "0.5em",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                sx={{ textAlign: "center" }}
                                            >
                                                Course Progress
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        mr: 1,
                                                    }}
                                                >
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={
                                                            (courseProgress.count /
                                                                courseProgress.total) *
                                                            100
                                                        }
                                                    />
                                                </Box>
                                                <Box sx={{ minWidth: 35 }}>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >{`${Math.round(
                                                        (courseProgress.count /
                                                            courseProgress.total) *
                                                            100
                                                    )}%`}</Typography>
                                                </Box>
                                            </Box>
                                            {courseProgress.count ==
                                                courseProgress.total && (
                                                <Button
                                                    variant="contained"
                                                    href={
                                                        "http://localhost:8000/api/get_certificate?enrollmentId=" +
                                                        enrollmentId
                                                    }
                                                    sx={{
                                                        alignSelf: "flex-end",
                                                    }}
                                                >
                                                    Get Certificate
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}

                                {course?.sections.map((val, idx) => {
                                    return (
                                        <Box>
                                            <Accordion>
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    expandIcon={<ExpandMore />}
                                                    id="panel1a-header"
                                                >
                                                    <Typography>
                                                        {"Section " +
                                                            (idx + 1) +
                                                            " - " +
                                                            val.name}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Subtitle
                                                        subtitle={val}
                                                        isEnrolled={isEnrolled()}
                                                        fetchCourseProgress={
                                                            fetchCourseProgress
                                                        }
                                                    />
                                                </AccordionDetails>
                                            </Accordion>
                                            <Divider />
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        maxWidth: "1400px",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            maxWidth: "1400px",
                        }}
                    >
                        <Typography
                            sx={{ fontSize: "50px", fontWeight: "bold" }}
                        >
                            Reviews
                        </Typography>
                    </Box>
                    {isEnrolled() && (
                        <Box sx={{ width: "100%" }}>
                            <TextField
                                label="Add Review"
                                multiline
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                rows={3}
                                placeholder={
                                    "Write your own review here... If you already reviewed before, the review will be updated!"
                                }
                                variant="filled"
                                sx={{ width: "85%" }}
                            />

                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    marginTop: "1em",
                                }}
                            >
                                <Box>
                                    <SubmitRating
                                        name="customized-color"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                        getLabelText={(value: number) =>
                                            `${value} Heart${
                                                value !== 1 ? "s" : ""
                                            }`
                                        }
                                        precision={0.1}
                                        icon={<Star fontSize="inherit" />}
                                        emptyIcon={
                                            <StarBorder
                                                sx={{ color: "black" }}
                                                fontSize="inherit"
                                            />
                                        }
                                    />
                                </Box>

                                <Button
                                    onClick={() => {
                                        axios
                                            .post(
                                                `${apiURL}/write_review`,
                                                {
                                                    reviewed:
                                                        course?.course._id,
                                                    score: rating,
                                                    text: review,
                                                },
                                                { withCredentials: true }
                                            )
                                            .catch((err) => {
                                                console.log(err);
                                            })
                                            .then((bla) => {
                                                axios
                                                    .post(
                                                        `${apiURL}/get_all_reviews`,
                                                        { reviewed: courseId }
                                                    )
                                                    .then((result) => {
                                                        setCourseReviews(
                                                            result.data
                                                        );
                                                    });
                                            });
                                    }}
                                    sx={{ width: "40%" }}
                                    variant="contained"
                                >
                                    Submit Review
                                </Button>
                            </Box>
                        </Box>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            maxWidth: "1400px",
                            gap: "2px",
                        }}
                    >
                        {courseReviews.length === 0 && (
                            <Typography variant="h6">
                                No reviews yet. Be the first to review!
                            </Typography>
                        )}
                        {courseReviews.map((val, idx) => {
                            return (
                                <>
                                    <Box
                                        sx={{
                                            backgroundColor: "#171718",
                                            padding: "10px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: "20px",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "30px",
                                                    color: "white",
                                                }}
                                            >
                                                {val.reviewerName + " "}
                                            </Typography>
                                            <StyledRating
                                                name="customized-color"
                                                value={val.score}
                                                getLabelText={(value: number) =>
                                                    `${value} Heart${
                                                        value !== 1 ? "s" : ""
                                                    }`
                                                }
                                                readOnly
                                                precision={0.1}
                                                icon={
                                                    <Star fontSize="inherit" />
                                                }
                                                emptyIcon={
                                                    <StarBorder
                                                        sx={{ color: "white" }}
                                                        fontSize="inherit"
                                                    />
                                                }
                                            />
                                        </Box>
                                        <Typography sx={{ color: "white" }}>
                                            {val.text}
                                        </Typography>
                                        {val.reviewer ===
                                            userInfo?.user?._id && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() =>
                                                        axios
                                                            .post(
                                                                `${apiURL}/delete_review`,
                                                                {
                                                                    reviewId:
                                                                        val._id,
                                                                }
                                                            )
                                                            .then((bla) => {
                                                                axios
                                                                    .post(
                                                                        `${apiURL}/get_all_reviews`,
                                                                        {
                                                                            reviewed:
                                                                                courseId,
                                                                        }
                                                                    )
                                                                    .then(
                                                                        (
                                                                            result
                                                                        ) => {
                                                                            setCourseReviews(
                                                                                result.data
                                                                            );
                                                                        }
                                                                    );
                                                            })
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                    <Divider />
                                </>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default CoursePage;
