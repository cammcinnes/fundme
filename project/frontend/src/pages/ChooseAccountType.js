import React from 'react';
import '../App.css';
import {useNavigate} from "react-router-dom";

function ChooseAccountType() {
    const navigate = useNavigate();

    const navIndividual = () => {
        navigate("/create/individual");
    }
    const navOrganization = () => {
        navigate("/create/organization");
    }

    return (
        <div>
        <h1>Choose an Account Type:</h1>
            <div className={"createAccountSelection"}>
                <button type={"submit"} value={'submit'} onClick={navIndividual}>Individual</button>
                <button type={"submit"} value={'submit'} onClick={navOrganization}>Organization</button>
            </div>
        </div>

    );
}

export default ChooseAccountType;