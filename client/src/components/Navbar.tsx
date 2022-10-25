import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
type NavItem = {
    text: string;
    onClick: () => void;
};

export default function DrawerAppBar() {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const commonNavItems: NavItem[] = [
        { text: "Courses", onClick: () => navigate("/courses") },
        { text: "search", onClick: () => navigate("/search") },
    ];
    const loggedInList: NavItem[] = [
        ...commonNavItems,
        { text: "Profile", onClick: () => navigate("/profile") },
        {
            text: "Logout",
            onClick: () => {
                setUser(false);
                navigate("/");
            },
        },
    ];
    const loggedOutList: NavItem[] = [
        ...commonNavItems,
        { text: "Sign Up", onClick: () => navigate("/signup") },
        {
            text: "Sign In",
            onClick: () => {
                setUser(true);
                navigate("/signin");
            },
        },
    ];
    const navItems: NavItem[] = user ? loggedInList : loggedOutList;

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                LOGO
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
        <Box sx={{ display: "flex" }}>
            <AppBar component="nav" sx={{ px: 3 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            "&:hover": { cursor: "pointer" },
                        }}
                        onClick={() => navigate("/")}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
                        display: { xs: "block", sm: "none" },
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
