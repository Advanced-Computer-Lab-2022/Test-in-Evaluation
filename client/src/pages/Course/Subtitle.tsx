import { apiURL, UserContext } from "../../App";
import { useContext, useReducer } from "react";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Paper, Box, Chip, Typography, Accordion } from "@mui/material";
import YoutubeEmbed from "./YoutubeEmbed";

import type { Section } from "../../types/Types";

type params = {
    subtitle: Section;
};

const Subtitle = ({ subtitle }: params) => {
    return (
        <Paper>
            <h1>{subtitle.name}</h1>
        </Paper>
    );
};

export default Subtitle;
