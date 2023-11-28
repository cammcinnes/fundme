import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../utils";
import Navbar from "../components/Nav";
import ContributorList from "../components/ContributorList";


function TopContributors() {
    const [accountType, setAccountType] = useState(null);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = async () => {
            const token = localStorage.getItem("token");
            const [result,username] = await checkAuth(token);
            if (result === null) {
                navigate("/login");
            } else {
                setAccountType(result)
            }
        }
        isLoggedIn();
    }, [])
    return (
        <div>
            <Navbar />
            <div className={'leaderboard'}>
                <h1>Top Contributors</h1>
                <ContributorList />
            </div>
        </div>
    );
}

export default TopContributors;