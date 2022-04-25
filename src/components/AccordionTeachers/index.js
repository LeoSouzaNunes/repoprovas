import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InternalAccordion from "../InternalAccordion";
import { v4 as uuid } from "uuid";
import { Box } from "@mui/material";

export default function TeachersAccordion({ teachers }) {
    return (
        <Box component="div" sx={{ width: "100%" }}>
            {teachers?.map(({ name, disciplines }) => {
                if (disciplines.length === 0) return;
                return (
                    <Accordion sx={{ width: "100%" }} key={uuid()}>
                        <AccordionSummary
                            sx={{ width: "100%" }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{`${name}`}</Typography>
                        </AccordionSummary>
                    </Accordion>
                );
            })}
        </Box>
    );
}
