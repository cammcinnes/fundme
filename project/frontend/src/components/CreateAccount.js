import React, {useState} from 'react';
import '../App.css';
import Login from "../pages/Login";

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    return (
        <div>
            <h2>Create an Account</h2>
            <div className={'create'}>
                <h3>Account Information</h3>
                <label>Email:
                    <input
                        type='email'
                        name='insertEmail'
                        placeholder='enter email here'
                        maxLength={50}
                        value={username}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label>Username:
                    <input
                        type='text'
                        name='insertUsername'
                        placeholder='enter username here'
                        maxLength={50}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label>Password:
                    <input
                        type='password'
                        name='insertPass'
                        placeholder='enter password here'
                        maxLength={50}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label> Re-enter Password:
                    <input
                        type='password'
                        name='insertPass2'
                        placeholder='re-enter password here'
                        maxLength={50}
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                    />
                </label>
            </div>
        </div>
    )
}

export default CreateAccount;