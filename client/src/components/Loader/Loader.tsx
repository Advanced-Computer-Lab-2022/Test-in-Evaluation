import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SectionModal from "../../pages/CreateCourse/SectionModal";
type props = {
    open: boolean;
};
const Loader = ({ open }: props) => {
    return (
        <>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default Loader;
