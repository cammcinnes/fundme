import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { checkAuth } from "../utils";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Navbar from "../components/Nav";
import '../App.css';

function Project() {
  const URL = process.env.REACT_APP_URL;
  const [accountType, setAccountType] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const response = await fetch(`${URL}/projects/${projectId}`);
        const parsedResponse = await response.json();
        if (parsedResponse.success === true) {
          setProjectData(parsedResponse.data);
        } else {
          alert("Error getting project data: " + parsedResponse.error);
        }
      } catch (error) {
        alert("No project with the given name found");
      }
    };
    const isLoggedIn = async () => {
      const token = localStorage.getItem("token");
      const [result, username] = await checkAuth(token);
      if (result === null) {
        navigate("/login");
      } else {
        setAccountType(result)
        getProjectData();
      }
    }
    isLoggedIn();
  }, [projectId]);

  return (
    <>
      <Navbar />
      <div className="project-container">
        {projectData === null ? (
          <div className="loader"></div>
        ) : (
          <div>
            <h2>Project: {projectData.info[0][0]}</h2>
            <h4>Organization: {projectData.info[0][1]}</h4>
            <p>{projectData.info[0][2]}</p>
            <p>Current balance: {projectData.info[0][3]}</p>
            {projectData.paymentTiers.map((item, index) => (
              <div key={index}>
                <div>
                  <p>{item[0]}</p>
                  <button>Donate</button>
                </div>
              </div>
            ))}
            <h3>Posts:</h3>
            { projectData.posts.map((post) => (<Post key={post[0]} postData={post}/>)) }
          </div>
        )}
      </div>
    </>
  );
}

export default Project
