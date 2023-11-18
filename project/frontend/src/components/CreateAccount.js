import React from 'react';
import '../App.css';

function CreateAccount({email, setEmail, username, setUsername, password, setPassword, password2, setPassword2}) {
    return (
        <div>
            <div className={'create'}>
                <h3>Account Information</h3>
                <label>Email:
                    <input
                        type='email'
                        name='insertEmail'
                        placeholder='enter email here'
                        maxLength={50}
                        value={email}
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