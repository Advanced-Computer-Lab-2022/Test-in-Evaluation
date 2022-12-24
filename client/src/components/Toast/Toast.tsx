import { Alert, Snackbar } from "@mui/material";

export type Alert = {
    isSuccess: boolean;
    isError: boolean;
    message: string;
};
type Props = {
    alert: Alert;
    setAlert: (state: Alert) => void;
};
const Toast = ({ alert, setAlert }: Props) => {
    const handleAlertClose = () =>
        setAlert({ isError: false, isSuccess: false, message: "" });
    return (
        <Snackbar
            open={alert.isSuccess || alert.isError}
            autoHideDuration={6000}
            onClose={handleAlertClose}
        >
            <Alert
                onClose={handleAlertClose}
                severity={alert.isSuccess ? "success" : "error"}
                variant="filled"
            >
                {alert.message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
