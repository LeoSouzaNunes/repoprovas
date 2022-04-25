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

function getTestsByQuery(queryValue, token) {
    const config = createConfig(token);
    const promise = axios.get(`${BASE_URL}/tests?filter=${queryValue}`, config);
    return promise;
}

const api = {
    signIn,
    signUp,
    getTestsByQuery,
};
export default api;
