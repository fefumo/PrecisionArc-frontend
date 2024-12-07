import React, { useState } from "react";
import { Link } from 'react-router-dom';
import LoginForm from './components/LoginForm'; // Ваш компонент LoginForm
import Header from "./components/Header";
import { useSelector } from 'react-redux';

function WelcomePage() {
    const [username, setUsername] = useState("");
    const token = useSelector((state) => state.auth.token);


    const handleLogin = (username) => {
        setUsername(username);
    };

    return (
        <div>
            <Header/>
            {username ? (
                <div>
                    <h2>Welcome, {username}!</h2>
                    <Link to="/welcomepage">Go to Home</Link>
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