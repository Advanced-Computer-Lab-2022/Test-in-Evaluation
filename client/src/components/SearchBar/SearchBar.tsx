import { FormEvent } from "react";
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
    SearchOptionsWrapper,
} from "./SeachBarStyles";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Menu, MenuItem, Switch, Typography } from "@mui/material";
import { UserContext } from "../../App";

function NavSearchBar() {
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null);
    const userState = useContext(UserContext);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const val = (searchRef?.current?.children[0] as HTMLInputElement).value;
        navigate("/search?course=" + val);
    };

    // Search Options State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Search onSubmit={onSubmit}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                ref={searchRef}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
            />
            {/* Search Options Menu */}
            <Box style={{ width: "100%", height: "100%" }}>
                <Button
                    style={{ width: "100%", height: "100%" }}
                    sx={{ color: "white" }}
                    variant="outlined"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    Search Options
                </Button>
                <Menu
                    sx={{ width: "100%" }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <Typography
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px",
                        }}
                    >
                        Course Title{" "}
                        <Switch
                            checked={userState.searchTitles}
                            onChange={(event) => {
                                console.log(
                                    userState.setSearchTitles(
                                        event.target.checked
                                    )
                                );
                            }}
                            defaultChecked
                        />
                    </Typography>
                    <Typography
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px",
                        }}
                    >
                        Course Subject{" "}
                        <Switch
                            checked={userState.searchSubjects}
                            defaultChecked
                            onChange={(event) => {
                                console.log(
                                    userState.setSearchSubjects(
                                        event.target.checked
                                    )
                                );
                            }}
                        />
                    </Typography>
                    <Typography
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px",
                        }}
                    >
                        Course Instructor{" "}
                        <Switch
                            checked={userState.searchInstructor}
                            defaultChecked
                            onChange={(event) => {
                                console.log(
                                    userState.setSearchInstructor(
                                        event.target.checked
                                    )
                                );
                            }}
                        />
                    </Typography>
                </Menu>
            </Box>
        </Search>
    );
}

export default NavSearchBar;
