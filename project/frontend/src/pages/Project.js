import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const URL = "http://localhost:65535";

function Project() {
  const [projectData, setProjectData] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const response = await fetch(`${URL}/projects/${projectId}`);
        const parsedResponse = await response.json();
        setProjectData(parsedResponse);
      } catch (error) {
        alert("No project with the given id found");
      }
    };

    getProjectData();
  }, [projectId]);

  return (
    <div className="main-container">
      {projectData === null ? (
        <div className="loader"></div>
      ) : (
        <div>
          <h2>Project: {projectData.result.info[0]}</h2>
          <h4>Organization: {projectData.result.info[1]}</h4>
          <p>{projectData.result.info[2]}</p>
          <p>Current balance: {projectData.result.info[3]}</p>
          {projectData.result.paymentTiers.map((item, index) => (
            <div key={index}>
              <div>
                <p>{item[0]}</p>
                <button>Donate</button>
              </div>
              {/* Render other content for each item as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Project
