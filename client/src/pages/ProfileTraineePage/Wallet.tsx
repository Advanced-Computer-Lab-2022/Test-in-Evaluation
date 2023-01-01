import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Input,
    TextField,
    Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { apiURL } from "../../App";
import { Loader, Toast } from "../../components";
import CreditCard from "./CreditCard";

const Wallet = () => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [isCardFlipped, setCardFlipped] = useState(false);
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpDate, setCardExpDate] = useState("");
    const [cardCSV, setCardCSV] = useState("");

    // if (loading) return <Loader open={loading} />;
    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <DialogTitle>Payment</DialogTitle>
                <DialogContent sx={{ width: "40vw" }}>
                    <Box sx={{ display: "flex" }}>
                        <CreditCard
                            name={cardName}
                            cardNumber={cardNumber}
                            expDate={cardExpDate}
                            cvv={cardCSV}
                            flipped={isCardFlipped}
                            onClick={() => setCardFlipped(!isCardFlipped)}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1em",
                                width: "100%",
                                marginTop: "3em",
                            }}
                        >
                            <TextField
                                label="Full Name"
                                onFocus={() => setCardFlipped(false)}
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                            />
                            <TextField
                                label="Card Number"
                                onFocus={() => setCardFlipped(false)}
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "1em",
                                }}
                            >
                                <TextField
                                    label="Expiry Date"
                                    onFocus={() => setCardFlipped(false)}
                                    value={cardExpDate}
                                    onChange={(e) =>
                                        setCardExpDate(e.target.value)
                                    }
                                />
                                <TextField
                                    label="CVV"
                                    onFocus={() => setCardFlipped(true)}
                                    value={cardCSV}
                                    onChange={(e) => setCardCSV(e.target.value)}
                                />
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Pay Now</Button>
                </DialogActions>
            </Dialog>
            <Toast alert={alert} setAlert={setAlert} />
            <Card sx={{ height: "fit-content" }}>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <Typography variant="h5">Wallet</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        <Typography variant="h6">Balance: $0</Typography>
                        <Box sx={{ display: "flex", gap: "1rem" }}>
                            <Input
                                placeholder="Amount"
                                sx={{ width: "75%" }}
                            ></Input>
                            <Button
                                variant="contained"
                                sx={{ width: "25%", alignSelf: "center" }}
                                onClick={handleClickOpen}
                            >
                                Recharge
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default Wallet;
