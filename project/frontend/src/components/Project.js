import React from "react";
function Project({ project }) {
    const [projectName, username, description, balance] = project;
    return (
        <>
            <h3>{projectName}</h3>
            <p>{description}</p>
            <p>Balance: {balance}</p>
        </>
    );
}

export default Project;
