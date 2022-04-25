import { Box, Button, TextField, Typography } from "@mui/material";
import { MainLogo, ButtonGithub, SectionDivider } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./styles";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SignIn() {
    const { auth, login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        hasError: false,
        message: "",
    });

    useEffect(() => {
        if (auth && auth.token) {
            navigate("/home");
        }
    }, []);

    function handleChange(e) {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setError({
            hasError: false,
            message: "",
        });
        setFormData({ ...formData, [inputName]: inputValue });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await api.signIn(formData);
            setIsLoading(false);
            login(data);
            navigate("/home");
        } catch (err) {
            setIsLoading(false);
            setError({
                hasError: true,
                message: "Dados inválidos",
            });
        }
    }

    return (
        <Box component="div" sx={styles.div}>
            <MainLogo />
            <Box component="main" onSubmit={handleSubmit} sx={styles.main}>
                <Typography variant="h1" sx={styles.h1}>
                    Login
                </Typography>
                <ButtonGithub />
                <SectionDivider></SectionDivider>
                <Box component="form" sx={styles.form}>
                    <TextField
                        name="email"
                        variant="outlined"
                        value={formData.email}
                        type="email"
                        label={error.hasError ? "" : "Email"}
                        onChange={handleChange}
                        sx={styles.input}
                        InputLabelProps={{ required: false }}
                        disabled={isLoading}
                        error={error.hasError}
                        helperText={error.message}
                        required
                    ></TextField>
                    <TextField
                        name="password"
                        value={formData.password}
                        variant="outlined"
                        type="password"
                        label={error.hasError ? "" : "Senha"}
                        onChange={handleChange}
                        sx={styles.input}
                        InputLabelProps={{ required: false }}
                        disabled={isLoading}
                        error={error.hasError}
                        helperText={error.message}
                        required
                    />
                    <Box component="div" sx={styles.divSpace}>
                        <Link to="/sign-up">
                            <Typography variant="body1" sx={styles.a}>
                                Não possuo cadastro
                            </Typography>
                        </Link>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            variant="contained"
                        >
                            ENTRAR
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
