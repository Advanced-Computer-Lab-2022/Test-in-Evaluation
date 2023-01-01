import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Checkbox,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Course } from "../../types/Types";
import { GetCurrency } from "../../data/currency";

type SelectedCourse = Course & { isSelected: boolean };
type Props = {
    course: SelectedCourse;
    setSelected: any;
};

const SelectCourseCard = ({ course, setSelected }: Props) => {
    const [isSelected, setIsSelected] = useState(false);
    const handleSelection = () => {
        setIsSelected((prev) => !prev);
        setSelected((prev: any) => {
            prev.map((selection: { courseId: string; isSelected: boolean }) => {
                if (selection.courseId === course._id) {
                    selection.isSelected = !selection.isSelected;
                }
            });
            return prev;
        });
    };
    return (
        <Card onClick={handleSelection}>
            <CardActionArea
                sx={{
                    height: "100%",
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Typography variant="h4">{course.title}</Typography>
                        <Checkbox
                            checked={isSelected}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </Box>
                    <Typography>
                        {course.summary.slice(0, 20) +
                            (course.summary.length > 20 ? "..." : "")}
                    </Typography>
                    <Typography variant="subtitle1">
                        Price: {course.price + " " + GetCurrency()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default SelectCourseCard;
