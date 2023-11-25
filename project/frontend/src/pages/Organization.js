import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Nav";
import { Link } from 'react-router-dom';

function Organization() {
  const URL = process.env.REACT_APP_URL;
  const { orgId } = useParams();
  const [orgData, setOrgData] = useState(null);
  const [orgProjects, setOrgProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [orgDonors, setOrgDonors] = useState([]);
  const [selectedDonors, setSelectedDonors] = useState([]);
  const [divisionResult, setDivisionResult] = useState([]);

  const handleDonorChange = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    if (checked) {
      setSelectedDonors([ ...selectedDonors, value ]);
    } else {
      setSelectedDonors(selectedDonors.filter((attr) => attr !== value));
    }
  }

  const handleProjectChange = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    if (checked) {
      setSelectedProjects([ ...selectedProjects, value ]);
    } else {
      setSelectedProjects(selectedProjects.filter((attr) => attr !== value));
    }

  }

  const getResult = async (donors, projects) => {
    const response = await fetch(`${URL}/organization/${orgData[0][0]}/divide`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ donors, projects })
    });
    const parsedResponse = await response.json();
    if (parsedResponse.success === true) {
      setDivisionResult(parsedResponse.result.donors);
    } else {
      alert("Error running query: " + parsedResponse.error);
    }
  }

  useEffect(() => {
    // TODO: handle case where no projects... should return all donors ???
    if (selectedDonors.length > 0) {
      getResult(selectedDonors, selectedProjects);
    } else {
      setDivisionResult([]);
    }
  }, [selectedDonors, selectedProjects]);
  
  const loadOrg = async () => {
    try {
      const response = await fetch(`${URL}/organization/${orgId}`);
      const parsedResponse = await response.json();
      if (parsedResponse.success === true) {
        setOrgData(parsedResponse.result.org);
        setOrgProjects(parsedResponse.result.projects);
        setOrgDonors(parsedResponse.result.donors);
      } else {
        alert("Error getting organization data: " + parsedResponse.error);
      }
    } catch (error) {
      alert("No organization with the given name found");
    }
  }
  
  useEffect(() => {
    loadOrg();
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="project-container">
        {orgData === null ? (
          <div className="loader"></div>) : (
            <div>
              <h2>Organization: {orgData[0][0]}</h2>
              <p>Description: {orgData[0][2]}</p>
              <p><i>Founded in {orgData[0][1].slice(0, 10)}.</i></p>
              <h3>See what selected donors have contributed money to each selected projects!</h3>
              <div className="donor-proj-input">
                <div>
                  <h3>Donors:</h3>
                  <form>
                    { orgDonors.map((donor) =>
                      (
                        <div key={donor[0]}>
                          <label>{donor[0]}</label>
                          <input className="attr-check" type="checkbox" name={donor[0]} value={donor[0]} onChange={handleDonorChange}/>
                        </div>
                      )
                    )}
                  </form>
                </div>
                <div>
                  <h3>Projects:</h3>
                  <form>
                    { orgProjects.map((project) =>
                      (
                        <div key={project[0]}>
                          <label><Link to={`/project/${project[0]}`}>{ project[0] }</Link></label>
                          <input className="attr-check" type="checkbox" name={project[0]} value={project[0]} onChange={handleProjectChange}/>
                        </div>
                      )
                    )}
                  </form>
                </div>
                <div>
                  <h3>Result:</h3>
                  { divisionResult.map((donor) => (
                    <p className="division-result">{ donor[0] }</p>
                  ))}
                </div>
              </div>
            </div>
        )}
      </div>
    </>
  );
}

export default Organization;
