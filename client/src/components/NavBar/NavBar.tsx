import { useState, useContext, SetStateAction } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Select, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import NavSearchBar from "../SearchBar/SearchBar";
import axios from "axios";
import { countries } from "../../data/countries";
import { apiURL, UserContext } from "../../App";
import { LocalLibrary } from "@mui/icons-material";

const drawerWidth = 240;
type NavItem = {
    text: string;
    onClick: () => void;
};

export default function DrawerAppBar() {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const userState = useContext(UserContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const commonNavItems: NavItem[] = [
        { text: "Courses", onClick: () => navigate("/course_collection") },
    ];
    const commonUserItems: NavItem[] = [
        { text: "Profile", onClick: () => navigate("/profile") },
        {
            text: "Logout",
            onClick: () => {
                axios
                    .post(apiURL + "/logout", {}, { withCredentials: true })
                    .then((response) => {
                        userState.setLoggedIn(false);
                        userState.setUserType("guest");
                        navigate("/");
                    });
            },
        },
    ];
    const guestNavList: NavItem[] = [
        ...commonNavItems,
        { text: "Sign Up", onClick: () => navigate("/signup") },
        {
            text: "Sign In",
            onClick: () => {
                navigate("/signin");
            },
        },
    ];
    const traineeNavList: NavItem[] = [
        ...commonNavItems,
        { text: "My Courses", onClick: () => navigate("/courses") },
        ...commonUserItems,
    ];
    const instructorNavList: NavItem[] = [
        ...commonNavItems,
        ...commonUserItems,
    ];
    const adminNavList: NavItem[] = [...commonNavItems, ...commonUserItems];

    const navItems: NavItem[] =
        userState.userType === "guest"
            ? guestNavList
            : userState.userType === "individualTrainee"
            ? traineeNavList
            : userState.userType === "corporateTrainee"
            ? traineeNavList
            : userState.userType === "instructor"
            ? instructorNavList
            : adminNavList;

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <LocalLibrary />
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: "center" }}
                            onClick={item.onClick}
                        >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", marginBottom: "0" }}>
            <AppBar component="nav" sx={{ px: 3 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: "flex", flexGrow: 1, gap: 0.5 }}>
                        <LocalLibrary
                            fontSize="large"
                            sx={{
                                display: { xs: "none", md: "block" },
                                "&:hover": { cursor: "pointer" },
                            }}
                            onClick={() => navigate("/")}
                        />
                        <NavSearchBar />
                    </Box>
                    <Box sx={{ display: { md: "block" }, marginRight: "5px" }}>
                        <Select
                            value={userState.country}
                            label="Select Country"
                            style={{ color: "white" }}
                            onChange={(event) => {
                                userState.setCountry(event.target.value);
                                console.log(event.target.value);
                            }}
                        >
                            {countries.map((element, index) => {
                                return (
                                    <MenuItem
                                        value={element.label}
                                        key={element.label}
                                    >
                                        <img
                                            loading="lazy"
                                            width="20"
                                            src={`https://flagcdn.com/w20/${element.code.toLowerCase()}.png`}
                                        />{" "}
                                        &nbsp;
                                        {element.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Box>
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.text}
                                sx={{ color: "#fff" }}
                                onClick={item.onClick}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar sx={{ p: 1 }} />
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
