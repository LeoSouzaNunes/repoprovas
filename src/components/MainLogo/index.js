import { Box } from "@mui/material";
import mainLogo from "../../assets/mainlogo.svg";

export default function MainLogo() {
    return (
        <Box
            component="header"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img src={mainLogo} alt="Main logo." />
        </Box>
    );
}
