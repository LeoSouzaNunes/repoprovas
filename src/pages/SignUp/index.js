import { Box, Button, TextField, Typography } from "@mui/material";
import { MainLogo, ButtonGithub, SectionDivider } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles";
import { useState } from "react";
import api from "../../services/api";

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmation: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState({
        hasError: false,
        message: "",
    });
    const [generalError, setGeneralError] = useState({
        hasError: false,
        message: "",
    });
    const navigate = useNavigate();

    function handleChange(e) {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setPasswordError({
            hasError: false,
            message: "",
        });
        setGeneralError({
            hasError: false,
            message: "",
        });
        setFormData({ ...formData, [inputName]: inputValue });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        if (!checkPasswordsMatch(formData.password, formData.confirmation)) {
            setIsLoading(false);
            return;
        }
        try {
            const body = { email: formData.email, password: formData.password };
            await api.signUp(body);
            navigate("/");
        } catch (err) {
            setIsLoading(false);
            setGeneralError({
                hasError: true,
                message: "Serviço indisponível.",
            });
        }
    }
    function checkPasswordsMatch(password, confirmation) {
        if (password !== confirmation) {
            setPasswordError({
                hasError: true,
                message: "Senhas não correspondem",
            });
            return false;
        }
        setPasswordError({
            hasError: false,
            message: "",
        });
        return true;
    }

    return (
        <Box component="div" sx={styles.div}>
            <MainLogo />
            <Box component="main" sx={styles.main}>
                <Typography variant="h1" sx={styles.h1}>
                    Cadastro
                </Typography>
                <ButtonGithub />
                <SectionDivider></SectionDivider>
                <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
                    <TextField
                        name="email"
                        variant="outlined"
                        type="email"
                        label={
                            passwordError.hasError || generalError.hasError
                                ? ""
                                : "Email"
                        }
                        value={formData.email}
                        onChange={handleChange}
                        sx={styles.input}
                        disabled={isLoading}
                        error={generalError.hasError}
                        helperText={generalError.message}
                        required
                    ></TextField>
                    <TextField
                        name="password"
                        variant="outlined"
                        type="password"
                        label={
                            passwordError.hasError || generalError.hasError
                                ? ""
                                : "Senha"
                        }
                        value={formData.password}
                        onChange={handleChange}
                        sx={styles.input}
                        disabled={isLoading}
                        error={passwordError.hasError || generalError.hasError}
                        helperText={
                            passwordError.message || generalError.message
                        }
                        required
                    />
                    <TextField
                        name="confirmation"
                        variant="outlined"
                        type="password"
                        label={
                            passwordError.hasError || generalError.hasError
                                ? ""
                                : "Confirme sua senha"
                        }
                        value={formData.confirmation}
                        onChange={handleChange}
                        sx={styles.input}
                        disabled={isLoading}
                        error={passwordError.hasError || generalError.hasError}
                        helperText={
                            passwordError.message || generalError.message
                        }
                        required
                    />
                    <Box component="div" sx={styles.divSpace}>
                        <Link to="/">
                            <Typography variant="body1" sx={styles.a}>
                                Já possuo cadastro
                            </Typography>
                        </Link>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="contained"
                        >
                            Cadastrar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
