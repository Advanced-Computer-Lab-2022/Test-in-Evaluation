import {
    Alert,
    Box,
    Button,
    Container,
    Snackbar,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { Loader } from "../../components";
import { apiURL, UserContext } from "../../App";
import { UserInfo } from "../../global";

const ContractPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const { setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const onAccept = async () => {
        try {
            setLoading(true);
            await axios.post(
                apiURL + "/contract",
                {},
                { withCredentials: true }
            );
            setUserInfo((userInfo: UserInfo) => ({
                ...userInfo,
                acceptedContract: true,
            }));
            setLoading(false);
            navigate("/profile");
        } catch (error) {
            setIsError(true);
            setLoading(false);
        }
    };
    const onDecline = () => {
        navigate("/");
    };

    const handleAlertClose = () => setIsError(false);

    if (loading) {
        return <Loader open={loading} />;
    }
    return (
        <>
            <Snackbar
                open={isError}
                autoHideDuration={6000}
                onClose={handleAlertClose}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity="error"
                    variant="filled"
                >
                    A server error occured please try again later!
                </Alert>
            </Snackbar>
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    border: "2px solid white",
                    borderRadius: "1.5rem",
                    backgroundColor: "white",
                    padding: "2rem 3rem",
                }}
            >
                <Typography variant="h2" component="h1">
                    Contract
                </Typography>
                <Typography variant="body1" lineHeight="1.7">
                    <p>
                        This Instructor Contract ("Contract") is entered into by
                        [Instructor Name] ("Instructor") and Test in Evaluation
                        ("Company"). By accepting this Contract, Instructor
                        agrees to the terms and conditions set forth below.
                    </p>

                    <h3>Rights to Posted Videos and Materials</h3>
                    <p>
                        Instructor retains ownership of all intellectual
                        property rights in the videos and materials posted by
                        Instructor on the Company's website. However, by posting
                        the videos and materials on the website, Instructor
                        grants the Company a non-exclusive, worldwide,
                        perpetual, royalty-free license to use, reproduce,
                        distribute, and display the videos and materials for the
                        purpose of promoting and distributing the courses on the
                        website.
                    </p>

                    <h3>Percentage Taken by the Company</h3>
                    <p>
                        The Company shall take a percentage of the course fee
                        for each registered trainee of Instructor's courses. The
                        current percentage is 5%. The percentage may be subject
                        to change at the discretion of the Company.
                    </p>

                    <h3>Termination</h3>
                    <p>
                        This Contract shall remain in effect until terminated by
                        either party. The Instructor may terminate this Contract
                        at any time by removing their courses from the website.
                        The Company may terminate this Contract if the
                        Instructor breaches any of the terms and conditions of
                        this Contract or engages in any illegal or fraudulent
                        activity.
                    </p>

                    <h3>Governing Law</h3>
                    <p>
                        This Contract shall be governed by and construed in
                        accordance with the laws of the State of [State],
                        without giving effect to any principles of conflicts of
                        law. Any legal action or proceeding arising out of or
                        relating to this Contract or the rights and obligations
                        of the parties hereto shall be brought in the courts of
                        the State of [State].
                    </p>
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "space-between",
                        width: "50%",
                    }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        onClick={onAccept}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onDecline}
                    >
                        Decline
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default ContractPage;
