import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InternalAccordion from "../InternalAccordion";
import { v4 as uuid } from "uuid";
import { Box } from "@mui/material";

export default function SimpleAccordion({ terms }) {
    return (
        <Box component="div" sx={{ width: "100%" }}>
            {terms?.map(({ number, disciplines }) => {
                if (disciplines.length === 0) return;
                return (
                    <Accordion sx={{ width: "100%" }} key={uuid()}>
                        <AccordionSummary
                            sx={{ width: "100%" }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{`${number}º período`}</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            {Object.keys(disciplines).map((discipline) => {
                                return discipline.length === 0 ? (
                                    ""
                                ) : (
                                    <InternalAccordion
                                        key={uuid()}
                                        name={discipline}
                                    />
                                );
                            })}
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Box>
    );
}
