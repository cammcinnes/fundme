import React from "react";
function Project({ project }) {
    const [projectName, username, description, balance] = project;

    return (
        <>
            <h3>{projectName}</h3>
            <p>{username}</p>
            <p>{description}</p>
            <p>{balance}</p>
        </>
    );
}

export default Project;