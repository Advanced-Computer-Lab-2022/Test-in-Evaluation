import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Input,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { apiURL, UserContext } from "../../App";
import { Loader, Toast } from "../../components";
import { GetCurrency } from "../../data/currency";
import RechargeModal from "./RechargeWindow/RechargeModal";

const Wallet = () => {
    const user = useContext(UserContext);
    const id = user.userInfo.user._id;

    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });

    const [openPayment, setOpenPayment] = useState(false);
    const handleClickOpen = () => {
        setOpenPayment(true);
    };
    const handleClose = () => {
        setOpenPayment(false);
    };

    const [chargeAmount, setChargeAmount] = useState(0);
    const rechargeBalance = () => {
        if (chargeAmount <= 0) {
            setAlert({
                isError: true,
                isSuccess: false,
                message: "Please enter a valid amount",
            });
            return;
        }

        axios
            .post(apiURL + "/pay_to_wallet", {
                amount: chargeAmount,
            })
            .then((res) => {
                setAlert({
                    isError: false,
                    isSuccess: true,
                    message: "Payment successful",
                });
                user.userInfo.user.wallet += chargeAmount;
                handleClose();
            })
            .catch((err: AxiosError) => {
                setAlert({
                    isError: true,
                    isSuccess: false,
                    message: err.response!.data as string,
                });
            });
    };

    return (
        <>
            <RechargeModal
                amountToBeCharged={chargeAmount}
                onCompleted={rechargeBalance}
                open={openPayment}
                setOpen={setOpenPayment}
            />
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
                        <Typography variant="h6">
                            Balance:{" "}
                            {user.userInfo.user.wallet + " " + GetCurrency()}
                        </Typography>
                        <Box
                            sx={{ display: "flex", gap: "1rem", width: "25%" }}
                        >
                            <Input
                                placeholder="Amount"
                                sx={{ width: "75%" }}
                                value={chargeAmount}
                                onChange={(e) =>
                                    setChargeAmount(
                                        parseInt(e.target.value) || 0
                                    )
                                }
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
