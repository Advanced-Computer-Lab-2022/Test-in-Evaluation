import { useContext, useEffect, useState } from "react";
import CreditCard from "./CreditCard";
import * as Cards from "./CardsSvgIcons";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import MaskInput from "react-maskinput/lib";
import { GetCurrency } from "../../../data/currency";

type props = {
    amountToBeCharged: number;
    onCompleted: () => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RechargeModal = ({
    amountToBeCharged,
    onCompleted,
    open,
    setOpen,
}: props) => {
    const [isCardFlipped, setCardFlipped] = useState(false);

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpDate, setCardExpDate] = useState("");
    const [cardCSV, setCardCSV] = useState("");

    const swapColor = function (basecolor: string) {
        document.querySelectorAll(".lightcolor").forEach(function (input) {
            input.setAttribute("class", "");
            input.setAttribute("class", "lightcolor " + basecolor);
        });
        document.querySelectorAll(".darkcolor").forEach(function (input) {
            input.setAttribute("class", "");
            input.setAttribute("class", "darkcolor " + basecolor + "dark");
        });
    };

    const processCardValue = (e: { maskedValue: string; value: string }) => {
        setCardNumber(e.maskedValue);
        if (/^4\d{0,15}/.test(e.maskedValue)) {
            document.getElementById("ccsingle")!.innerHTML = Cards.visa_single;
            document.getElementById("ccicon")!.innerHTML = Cards.visa;
            swapColor("lime");
        } else if (
            /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/.test(
                e.maskedValue
            )
        ) {
            document.getElementById("ccsingle")!.innerHTML =
                Cards.mastercard_single;
            document.getElementById("ccicon")!.innerHTML = Cards.mastercard;
            swapColor("lightblue");
        } else {
            document.getElementById("ccsingle")!.innerHTML = "";
            document.getElementById("ccicon")!.innerHTML = "";
            swapColor("grey");
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
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
                            marginTop: "1.5em",
                        }}
                    >
                        <Typography>
                            You're recharging the amount:{" "}
                            {amountToBeCharged + " " + GetCurrency()}
                        </Typography>
                        <TextField
                            placeholder="Full Name"
                            onFocus={() => setCardFlipped(false)}
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                gap: "5px",
                            }}
                        >
                            <MaskInput
                                mask="0000 0000 0000 0000"
                                value={cardNumber}
                                onValueChange={processCardValue}
                                onFocus={() => setCardFlipped(false)}
                                /*
                        // @ts-ignore */
                                placeholder="Card Number"
                            />
                            <svg
                                id="ccicon"
                                className="ccicon"
                                width="750"
                                height="471"
                                viewBox="0 0 750 471"
                                version="1.1"
                                style={{ alignSelf: "center" }}
                            ></svg>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "1em",
                            }}
                        >
                            <MaskInput
                                /*
                        // @ts-ignore */
                                placeholder="Expiry Date"
                                mask="00/00"
                                onFocus={() => setCardFlipped(false)}
                                value={cardExpDate}
                                onValueChange={(e) =>
                                    setCardExpDate(e.maskedValue)
                                }
                            />
                            <MaskInput
                                /*
                        // @ts-ignore */
                                placeholder="CVV"
                                onFocus={() => setCardFlipped(true)}
                                value={cardCSV}
                                mask="0000"
                                onValueChange={(e) => setCardCSV(e.maskedValue)}
                            />
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onCompleted}>Pay Now</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RechargeModal;
