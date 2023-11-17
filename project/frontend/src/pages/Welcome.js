import React from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
function Welcome() {
    const navigate = useNavigate();

    const movePages = () => {
        navigate("/login");
    }
    return (
        <div>Welcome page
            <div className={'startMenu'}>
                <button type={"submit"} value={'submit'} onClick={movePages}>Login</button>
                <button type={"submit"} value={'submit'}>Create Account</button>
            </div>
        </div>
    );
}
export default Welcome;
