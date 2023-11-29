import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
function Welcome() {
    const URL = process.env.REACT_APP_URL;
    const [dbConnected, setDbConnected] = useState(null);
    const [resetting, setResetting] = useState(false);
    const navigate = useNavigate();

    const moveLogin = () => {
        navigate("/login");
    }
    const moveCreate = () => {
        navigate("/create");
    }
    const resetDatabase = async () => {
        setResetting(true);
        const response = await fetch(URL + "/initiate-database", {
            method: 'POST'
        });
        const parsedResponse = await response.json();
        if (parsedResponse.success === true) {
            alert("database initiated / reset successfully!");
        } else {
            alert("Error initiating table!");
        }
        setResetting(false);
    }
    useEffect(() => {
        const checkConnection = async () => {
            const response = await fetch(URL + "/check-db-connection");
            const parsedResponse = await response.json();
            if (parsedResponse.success === false) {
                alert("error connecting to database!");
            }
            setDbConnected(parsedResponse.success);
        }
        checkConnection();
    }, [URL])
    return (
        <div className="welcome">
            <h3>Welcome Page</h3>
            <button value={'submit'} onClick={moveLogin}>Login</button>
            <button value={'submit'} onClick={moveCreate}>Create Account</button>
            <button onClick={resetDatabase}>Reset database</button>
            {
                dbConnected === null ? <span className="loader"></span> : <span>Database status: { dbConnected ? "connected": "not connected" }</span>
            }
            { resetting && <div className="loader"/>}
        </div>
    );
}
export default Welcome;
