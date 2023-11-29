import React, { useState, useEffect } from 'react';
import '../App.css';
import PersonalContribution from "./PersonalContribution";


const URL = process.env.REACT_APP_URL;

function MyContributions({user}) {
    const [Contributions, setContributions] = useState([]);

    async function fetchUserContributions(user) {
        const response = await fetch(URL + `/aggregation/${user}`, {
            method: "GET"
        });
        const contributionData = await response.json();
        if (contributionData.success) {
            setContributions(contributionData.result);
        }
    }

    return (
        <>
            {Contributions.map((Contribution, index) => (
                <PersonalContribution key={index} Contribution={Contribution} />
            ))}
            <button onSubmit={fetchUserContributions(user)}> Get list of my Contributions</button>
        </>
    );
}
export default MyContributions;