import React from 'react';
import Insert from "../components/Insert";
import Button from "../components/Button";
import '../App.css';


function Login(){
    return (
            <div>
                <h2>My Account</h2>
                <div className='login'>
                    <Insert label={'Email:'}
                            type={'email'}
                            name={'insertEmail'}
                            placeholder={'example@gmail.com'}
                            length={50}/>
                    <Insert label={'Username:'}
                            type={'text'}
                            name={'insertUsername'}
                            placeholder={'example'}
                            length={50}/>
                    <Insert label={'Password:'}
                            type={'password'}
                            name={'insertPass'}
                            placeholder={'1234'}
                            length={50}/>
                </div>
                <Button name={"Login"}/>
            </div>
    );
}

export default Login;