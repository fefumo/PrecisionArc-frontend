import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/PrecisionArc/auth';

export const loginUser = (username, password) => {
    return axios.post(`${API_BASE_URL}/login`, {
        username,
        password: password,
    });
};

export const registerUser = (username, password) => {
    return axios.post(`${API_BASE_URL}/register`, {
        username,
        password: password,
    });
};