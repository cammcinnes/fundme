import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../utils";

function Login(){
        const URL = process.env.REACT_APP_URL;
        const navigate = useNavigate();
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const handleLogin = async () => {
                try {
                        const response = await fetch(URL + "/auth/login", {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({ username, password })
                        });
                        const parsedResponse = await response.json();
                        if (parsedResponse.success === true) {
                                localStorage.setItem('token', parsedResponse.result.token);
                                navigate("/main");
                                alert("Successfully logged in!");
                        } else {
                                alert(parsedResponse.error);
                        }
                } catch (error) {
                        alert(error.message);
                }
        }
        // we use this effect to navigate to main page if already logged in!
        useEffect(() => {
                const isLoggedIn = async () => {
                        const token = localStorage.getItem("token");
                        const [result, username] = await checkAuth(token);
                        if (result !== null) {
                                navigate("/main");
                        }
                }
                isLoggedIn();
        }, [])
        return (
            <div>
                <h2>My Account</h2>
                <div className='login'>
                    <label>Username:
                           <input 
                            className="login-input"
                            type='text'
                            name='insertUsername'
                            placeholder='example'
                            maxLength={50}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                           />
                    </label>
                    <label>Password:
                            <input
                            className="login-input"
                            type='password'
                            name='insertPass'
                            placeholder='1234'
                            maxLength={50}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            />
                    </label>
                </div>
                <button type={"submit"} value={'submit'} onClick={handleLogin}>Login</button>
            </div>
        );
}

export default Login;
