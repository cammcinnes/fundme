import React from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
function Welcome() {
    const navigate = useNavigate();

    const moveLogin = () => {
        navigate("/login");
    }
    const moveCreate = () => {
        navigate("/create");
    }
    return (
        <div>Welcome page
            <div className={'startMenu'}>
                <button type={"submit"} value={'submit'} onClick={moveLogin}>Login</button>
                <button type={"submit"} value={'submit'} onClick={moveCreate}>Create Account</button>
            </div>
        </div>
    );
}
export default Welcome;
