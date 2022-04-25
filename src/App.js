import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp } from "./pages";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./contexts/authContext";

function App() {
    return (
        <AuthProvider>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
