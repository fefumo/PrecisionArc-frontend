import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Для навигации после успешной регистрации
import { registerUser } from '../services/auth-api';

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [error, setError] = useState(""); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (username && password) {
            try{
                const response = await registerUser(username,password);
                console.log("Registration successful for", username);
                navigate('/'); // go to welcomepage   
            }catch(err){
                console.error("Registration failed:", err.response?.data || err.message);
                setError(err.response?.data?.message || "Registration failed.");    
            }

        } else {
            setError("All fields are required.");
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default RegisterForm;
