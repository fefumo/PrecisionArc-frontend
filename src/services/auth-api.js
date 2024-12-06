import apiClient from './apiClient';

const API_BASE_URL = 'http://localhost:8080/PrecisionArc/auth';

export const loginUser = (username, password) => {
    return apiClient.post("/login", { username, password });
};

export const registerUser = (username, password) => {
    return apiClient.post("/register", { username, password });
};
