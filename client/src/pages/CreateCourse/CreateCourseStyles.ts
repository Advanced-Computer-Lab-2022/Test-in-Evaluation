import { styled } from "@mui/system";

export const CreateCourseForm = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "max(20rem, 50%)",
    margin: "0 auto",
    padding: "1rem",
    "& > *": {
        width: "100%",
    },
});
