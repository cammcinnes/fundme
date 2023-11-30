import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {checkAuth} from "../utils";
import Navbar from "../components/Nav";

function RecurringContributors() {
    const URL = process.env.REACT_APP_URL;
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState(null);
    const [contributorList, setContributorList] = useState([]);

    useEffect(() => {
        const isLoggedIn = async () => {
            const token = localStorage.getItem("token");
            const [result, username] = await checkAuth(token);
            if (result === null) {
                navigate("/login");
            } else {
                setAccountType(result);
            }
        }
        isLoggedIn();
    }, [])

    async function fetchRecurrAccts() {
        try {
            const response = await fetch(`${URL}/aggregation-having`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.success) setContributorList(data.result);
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <>
            <Navbar/>
            <h1>Aggregation Query with Having</h1>
            <h2>Displays all contributors that have contributed to a project more than once</h2>
            <table>
                {contributorList.length > 0 &&
                <tbody>
                <tr>
                    <th style={{textAlign: "left"}}>Contributor</th>
                    <th style={{textAlign: "left"}}>Project Name</th>
                    <th style={{textAlign: "left"}}>Contribution Count</th>
                </tr>
                {contributorList.map((contributor, index) => (
                    <tr key={index}>
                        {contributor.map((attr, index) => (
                            <td key={index}>{attr}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
                }
            </table>
            <button style={{marginTop: "1em"}} onClick={fetchRecurrAccts}>Get Contributors</button>
        </>
    );
}

export default RecurringContributors;