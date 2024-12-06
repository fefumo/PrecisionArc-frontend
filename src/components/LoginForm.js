import React, { useState } from "react";
import { loginUser } from "../services/auth-api";
import { useDispatch } from "react-redux";
import { setToken } from "../services/store";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit= async (e) => {
        e.preventDefault();
        setError(null);

        try{
            const response = await loginUser(username, password);
            console.log("succsessful login: ", response.data);
            const { token } = response.data;
            dispatch(setToken(token));
            alert("you are logged in");
            navigate("/mainpage");
            
        } catch(err){
            console.error("Login failed:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Login failed.");
        }
    }
            
    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input 
                        type="username"
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input 
                        type="password"
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
        </>
    )
};

export default LoginForm;