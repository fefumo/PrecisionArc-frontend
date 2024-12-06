import axios from "axios";
import store from "./store";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/PrecisionArc/auth",
});

apiClient.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
