import React, { useState } from 'react';
import '../App.css';
import PersonalContribution from "./PersonalContribution";


const URL = process.env.REACT_APP_URL;

function MyContributions({user}) {
    const [Contributions, setContributions] = useState([]);
    const [showContr, setShowContr] = useState(false);

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
        if (!showContr) {
            console.log("getting user contributions");
            await fetchUserContributions(user);
        }
        setShowContr(!showContr);
    }

    return (
        <>
            { showContr && Contributions.map((Contribution, index) => (
                <PersonalContribution key={index} Contribution={Contribution} />
            ))}
            <button style={{marginTop: "1em"}} onClick={handleSubmitUserContributions}>{ showContr ? "Hide" : "Show" } Contributions</button>
        </>
    );
}
export default MyContributions;
