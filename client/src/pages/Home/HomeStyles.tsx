import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

export const LandingContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "2rem",
    translate: "0 -1rem 0",
    paddingBottom: "1rem",
}));

export const HeroSection = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    alignItems: "center",
    gap: "2rem",
    padding: "1rem",
    "& > *": {
        width: "100%",
    },
    background: "#f9f9f9",
    boxShadow: "0 0 0 100vmax #f9f9f9",
    clipPath: "inset(0 -100vmax)",
    position: "relative",
    isolation: "isolate",
}));

export const Dot = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "0%",
    left: "0",
    width: "5rem",
    aspectRatio: "1/1",
    background: "hsl(190, 50%, 40%)",
    borderRadius: "50%",
    opacity: "0.5",
    zIndex: -1,
}));

export const InstructorImage = styled("img")(({ theme }) => ({
    width: "100px",
    aspectRatio: "1",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 0 0 0 #eee",
    transition: "box-shadow 0.3s ease-in-out",
}));
