import { Box } from "@mui/material";
import { MainLogo } from "../../components";
import styles from "./styles";

export default function Home() {
    return (
        <Box component="div" sx={styles.container}>
            <MainLogo></MainLogo>
        </Box>
    );
}
