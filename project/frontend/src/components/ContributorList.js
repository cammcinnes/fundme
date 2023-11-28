import React, { useState, useEffect } from 'react';
import '../App.css';
import Card from "./Card";

const URL = process.env.REACT_APP_URL;

function ContributorList() {
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        async function fetchContributors() {
            const response = await fetch(URL + `/aggregation/top`, {
                method: "GET"
            });
            const contributorData = await response.json();
            if (contributorData.success) {
                setContributors(contributorData.result);
            }
        }
        fetchContributors();
    }, []);

    return(
      <div>
          {contributors.map((Contributor, index) => (
              <Contributor key={index} Contributor={Contributor} />
          ))}
      </div>
    );
}

export default ContributorList;