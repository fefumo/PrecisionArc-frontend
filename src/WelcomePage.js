import React, { useState } from "react";
import { Link } from 'react-router-dom';
import LoginForm from './components/forms/LoginForm';
import Header from "./components/Header";
import './styles/welcomePage.css';

function WelcomePage() {
    const [username, setUsername] = useState("");


    const handleLogin = (username) => {
        setUsername(username);
    };

    return (
        <div className="welcome-container">
          <Header />
          <div className="login-section">
            <LoginForm onLogin={handleLogin} />
            <p className="register-prompt">Don't have an account?</p>
            <Link className="register-link" to="/register">Register</Link>
          </div>
        </div>
      );
      
}

export default WelcomePage;