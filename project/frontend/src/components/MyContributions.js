import React, { useState } from 'react';
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
            console.log("got contributions");
            setContributions(contributionData.result);
        }
    }

    async function handleSubmitUserContributions() {
        console.log("getting user contributions");
        await fetchUserContributions(user);
    }

    return (
        <>
            {Contributions.map((Contribution, index) => (
                <PersonalContribution key={index} Contribution={Contribution} />
            ))}
            <button style={{marginTop: "1em"}} onClick={handleSubmitUserContributions}>Get List of my Contributions</button>
        </>
    );
}
export default MyContributions;