import React from "react";
import { Link } from 'react-router-dom';
function Project({ project }) {
    const [projectName, _username, description, balance] = project;
    return (
        <>
            <h3><Link to={`/project/${projectName}`}>{projectName}</Link></h3>
            <p>{description}</p>
            <p>Balance: {balance}</p>
        </>
    );
}

export default Project;
