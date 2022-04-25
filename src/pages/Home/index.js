import { Box, Button, Divider, TextField } from "@mui/material";
import { TeachersAccordion, MainLogo, SimpleAccordion } from "../../components";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./styles";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Home() {
    const { auth, login } = useAuth();
    const [selectedFilter, setSelectedFilter] = useState("terms");
    const [testsArray, setTestsArray] = useState([]);
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

    async function handleButtonClick(e) {
        const name = e.target.name;
        setSelectedFilter(name);
        if (name === "add") {
            return;
        }
        try {
            const { data } = await api.getTestsByQuery(name, auth.token);
            setTestsArray(data);
        } catch (error) {}
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
                    <Button
                        onClick={handleButtonClick}
                        name="terms"
                        variant={
                            selectedFilter === "terms"
                                ? "contained"
                                : "outlined"
                        }
                    >
                        DISCIPLINAS
                    </Button>
                    <Button
                        onClick={handleButtonClick}
                        name="teachers"
                        variant={
                            selectedFilter === "teachers"
                                ? "contained"
                                : "outlined"
                        }
                    >
                        PESSOA INSTRUTORA
                    </Button>
                    <Button
                        onClick={handleButtonClick}
                        name="add"
                        variant={
                            selectedFilter === "add" ? "contained" : "outlined"
                        }
                    >
                        ADICIONAR
                    </Button>
                </Box>
                {testsArray.length === 0 ? (
                    ""
                ) : selectedFilter === "teachers" ? (
                    <TeachersAccordion
                        teachers={testsArray}
                    ></TeachersAccordion>
                ) : (
                    <SimpleAccordion terms={testsArray}></SimpleAccordion>
                )}
            </Box>
        </Box>
    );
}
