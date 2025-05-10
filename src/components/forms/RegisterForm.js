import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/auth-api';
import '../../styles/register.css';

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Hook for register
    const [registerUser, { isLoading, error: apiError }] = useRegisterUserMutation();
    
    const handleLogout = () => {
        navigate('/'); // Redirect to welcomePage
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await registerUser({ username, password }).unwrap();
            console.log("Registration successful for", username);
            navigate('/');
        } catch (err) {
            console.error("Registration failed:", err.message || err);
            setError(apiError?.data?.message || "Registration failed.");
        }
    };

    return (
        <div>
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="p-field">
                        <label htmlFor="username">Username</label>
                        <InputText 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            autoFocus 
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="password">Password</label>
                        <Password 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Password 
                            id="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <Button 
                            label="Register" 
                            icon="pi pi-user-plus" 
                            type="submit" 
                            className="p-button-primary" 
                            loading={isLoading}
                        />
                        <Button
                            label="Back"
                            icon="pi pi-sign-out"
                            className='p-button-danger'
                            onClick={handleLogout}
                        />
                    </div>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
