import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";

export default function InternalAccordion({ name }) {
    return (
        <Box component="div" sx={{ width: "100%" }}>
            <Accordion sx={{ width: "100%" }}>
                <AccordionSummary
                    sx={{ width: "100%" }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        <b>{name}</b>
                    </Typography>
                </AccordionSummary>
            </Accordion>
        </Box>
    );
}
