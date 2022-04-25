import { Box, Button, Divider, TextField } from "@mui/material";
import { MainLogo, SimpleAccordion } from "../../components";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./styles";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { auth, login } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth || !auth.token) {
            navigate("/");
        }
    }, []);

    function handleLogout() {
        login({ delete: true });
        navigate("/");
    }
    return (
        <Box component="div" sx={styles.container}>
            <Box component="header" sx={styles.header}>
                <MainLogo />
                <Box
                    onClick={handleLogout}
                    component="div"
                    sx={styles.iconContainer}
                >
                    <LogoutIcon sx={styles.icon} />
                </Box>
            </Box>
            <TextField
                variant="outlined"
                label="Pesquise por disciplina"
                sx={styles.input}
            ></TextField>
            <Divider sx={styles.divider}></Divider>
            <Box component="div" sx={styles.containerMainContent}>
                <Box component="div" sx={styles.navbar}>
                    <Button variant="outlined">DISCIPLINAS</Button>
                    <Button variant="outlined">PESSOA INSTRUTORA</Button>
                    <Button variant="outlined">ADICIONAR</Button>
                </Box>
                <SimpleAccordion></SimpleAccordion>
            </Box>
        </Box>
    );
}
