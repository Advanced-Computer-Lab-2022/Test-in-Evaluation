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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Alias quasi dolores est accusantium itaque minus, earum
                    adipisci voluptatibus reiciendis repudiandae. Placeat quae,
                    repellendus at atque tempora culpa eligendi aliquid deserunt
                    doloremque quis, quia nemo eum neque eius natus eveniet,
                    ipsam laboriosam molestias distinctio ducimus. Sint facilis
                    officiis eaque voluptas possimus! Rem est quos sunt placeat
                    voluptas, tempore nobis suscipit illo eum blanditiis quasi
                    quas quam doloremque eligendi error quia explicabo
                    repellendus officiis quibusdam similique dolore autem
                    necessitatibus soluta. Qui, quibusdam expedita! Fugit
                    reprehenderit ab quas, sed dolorum quod pariatur aspernatur
                    magni minima nisi, corrupti voluptates odit debitis
                    voluptas? Dolores impedit vero pariatur magni temporibus
                    obcaecati incidunt, culpa excepturi harum ex suscipit,
                    debitis cumque atque et officiis cum! Tempore non quod,
                    itaque velit recusandae temporibus suscipit est natus quas
                    dolores, aliquid deserunt, expedita laudantium. Ullam quod
                    minima ipsum molestias nulla facilis voluptatibus enim
                    libero, vel officia. Minus unde magni commodi soluta.
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
