import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm'; // Ваш компонент LoginForm

function WelcomePage() {
    const [username, setUsername] = useState(""); // Стейт для хранения имени пользователя

    const handleLogin = (username) => {
        // Обрабатываем успешный вход, сохраняем username
        setUsername(username);
    };

    return (
        <div>
            <h1>Welcome to the App</h1>
            {username ? (
                <div>
                    <h2>Welcome, {username}!</h2>
                    <Link to="/home">Go to Home</Link>
                </div>
            ) : (
                <div>
                    <LoginForm onLogin={handleLogin} />
                    <p>Don't have an account?</p>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </div>
    );
}

export default WelcomePage;