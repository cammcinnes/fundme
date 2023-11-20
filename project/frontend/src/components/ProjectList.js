import React, { useState, useEffect } from 'react';
import '../App.css';
import Project from './Project';

const URL = "http://localhost:65535";
function ProjectList() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            const response = await fetch(`${URL}/projects`, {
                method: "GET"
            });
            const projectsData = await response.json();
            if (projectsData.success) {
                setProjects(projectsData.data);
            }
        }
        fetchProjects();
    }, []);

    return (
        <>
            {projects.map((project, index) => (
                <Project key={index} project={project} />
            ))}
        </>
    );
}

export default ProjectList;