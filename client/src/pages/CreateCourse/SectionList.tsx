import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NewSection } from "./CreateCourse";
type props = {
    sections: NewSection[];
};
const SectionList = ({ sections }: props) => {
    return (
        <Box>
            <Typography
                sx={{ textAlign: "center", fontWeight: "bold", mb: "0.5rem" }}
            >
                {sections.length === 0
                    ? "No sections added yet"
                    : "Course Sections:"}
            </Typography>
            {sections.map((section, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{section.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ mb: "1rem" }}>
                            {section.description}
                        </Typography>
                        <Typography>
                            Total Hours: {section.totalHours}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default SectionList;
