import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from "../components/Nav";
import { Link } from 'react-router-dom';

function Organizations() {
  const URL = process.env.REACT_APP_URL;
  const [orgs, setOrgs] = useState([]);

  const loadOrgs = async () => {
    try {
      const response = await fetch(`${URL}/organization/all`);
      const parsedResponse = await response.json();
      if (parsedResponse.success === true) {
        setOrgs(parsedResponse.result.orgs);
      } else {
        alert("Error getting organizations: " + parsedResponse.error);
      }
    } catch (error) {
      alert("Error loading organizations");
    }
  }

  useEffect(() => {
    loadOrgs();
  }, []);

  return (
    <>
      <Navbar />
      <h3>Organizations:</h3>
      <div>
        { orgs.map((org, i) => (
          <div key={i} className="organization">
            <p>
              <li><Link to={`/organization/${org[0]}`}>{ org[0] }</Link></li>
            </p>
            <p>{ org[2] }</p>
            <p><i>Founded in {org[1].slice(0, 10)}.</i></p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Organizations;
