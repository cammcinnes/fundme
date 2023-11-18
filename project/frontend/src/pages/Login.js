import React, { useState } from 'react';
import '../App.css';

const URL = "http://localhost:65535";


function Login(props){
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const handleLogin = async () => {
                try {
                        const response = await fetch(URL + "/login", {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({ username, password })
                        });
                        const parsedResponse = await response.json();
                        if (parsedResponse.success === true) {
                                props.setAccount(parsedResponse.accountType);
                        } else {
                                alert(parsedResponse.error);
                        }
                } catch (error) {
                        alert(error.message);
                }
        }
        return (
            <div>
                <h2>My Account</h2>
                <div className='login'>
                    <label>Username:
                           <input
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
