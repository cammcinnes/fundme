import React, {useEffect, useState} from 'react';
import Navbar from "../components/Nav";

function Join() {
    const URL = process.env.REACT_APP_URL;

    const [selectedProject, setSelectedProject] = useState("");
    const [projectNames, setProjectNames] = useState([]);
    const [individuals, setIndividuals] = useState([]);

    useEffect(() => {
        async function getContributorsOfProject() {
            try {
                const response = await fetch(`${URL}/join/${selectedProject}`, {
                    method: "GET"
                });
                const data = await response.json();
                if (data.success) setIndividuals(data.result);
            } catch (err) {
                alert(err.message);
            }
        }

        getContributorsOfProject();
    }, [selectedProject, URL]);

    useEffect(() => {
        async function getProjectNames() {
            try {
                const response = await fetch(`${URL}/projects/names`, {
                    method: "GET"
                });
                const data = await response.json();
                if (data.success) setProjectNames(data.result);
            } catch (err) {
                alert(err.message);
            }
        }

        getProjectNames();
    });

    return (
        <>
            <Navbar/>
            <h1>Join Query: find all the individuals who have donated to a particular project</h1>
            <div>
                <label htmlFor="project-select"><h2>Choose a project:</h2></label>
                <select
                    id="project-select"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                >
                    {projectNames.map((projectName, index) => (
                        <option key={index} value={projectName}>
                            {projectName}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {selectedProject !== "" &&
                    <table>
                        <tbody>
                        <tr>
                            <th>Individual</th>
                        </tr>
                        {individuals.map((username, index) => {
                            return (
                                <tr>
                                    <td key={index}>
                                        {username}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                }
            </div>
        </>
    );
}

export default Join;