import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../services/store";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useLoginUserMutation } from "../../services/auth-api"; 
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // hook for login
    const [loginUser, { isLoading, error: apiError }] = useLoginUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Perform a mutation for the login
            const response = await loginUser({ username, password }).unwrap();
            console.log("Successful login: ", response);
            const { token } = response;
            dispatch(setToken(token));
            navigate('/main')
        } catch (err) {
            console.error("Login failed:", err.message || err);
            setError(apiError?.data?.message || "Login failed.");
        }
    };

    return (
        <div className="p-d-flex p-flex-column p-align-center p-mt-5">
            <div className="card">
                <h2>Login</h2>
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
                        <Button 
                            label="Login" 
                            icon="pi pi-sign-in" 
                            type="submit" 
                            className="p-button-success" 
                            loading={isLoading}
                        />
                    </div>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
