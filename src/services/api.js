import axios from "axios";

const BASE_URL = "http://localhost:4000";

function createConfig(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

function signIn(body) {
    const promise = axios.post(`${BASE_URL}/sign-in`, body);

    return promise;
}

function signUp(body) {
    const promise = axios.post(`${BASE_URL}/sign-up`, body);

    return promise;
}
const api = {
    signIn,
    signUp,
};
export default api;
