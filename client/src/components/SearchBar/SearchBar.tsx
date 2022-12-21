import { FormEvent } from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "./SeachBarStyles";
import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function NavSearchBar() {
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const val = (searchRef?.current?.children[0] as HTMLInputElement).value;
        navigate("/search?course=" + val);
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
        </Search>
    );
}

export default NavSearchBar;
