import React, {useState, useEffect} from "react";
import {checkAuth} from "../utils";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Nav";
import QueryParam from "../components/QueryParam";

function Selection() {
    const URL = process.env.REACT_APP_URL;
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState(null);
    const [projectList, setProjectList] = useState([]);
    const [logicalOp, setLogicalOp] = useState("AND");
    const [selectedAttribute, setSelectedAttribute] = useState("projectName");
    const [queryParams, setQueryParams] = useState([
        {id: 0, attribute: "projectName", logicalOp: "AND", queryData: {}}
    ]);

    useEffect(() => {
        const isLoggedIn = async () => {
            const token = localStorage.getItem("token");
            const [result, username] = await checkAuth(token);
            if (result === null) {
                navigate("/login");
            } else {
                setAccountType(result);
            }
        }
        isLoggedIn();
    }, [])

    function handleQueryInputChange(id, queryData) {
        setQueryParams((currQueryParams) =>
            currQueryParams.map(query =>
                query.id === id ? {...query, queryData} : query
            )
        );
    }

    function handleAddQueryParam() {
        setQueryParams((currQueryParams) => [
            ...currQueryParams,
            {id: currQueryParams.length, attribute: selectedAttribute, logicalOp: `${logicalOp}`, queryData: {}}
        ]);
    }

    async function handleFetchSubmit() {
        try {
            const response = await fetch(`${URL}/selection`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(queryParams)
            });
            const data = await response.json();
            if (data.success) setProjectList(data.result);
        } catch (err) {
            alert(err.message);
        }

    }

    function handleLogicalOpChange(event) {
        setLogicalOp(event.target.value);
    }

    function handleSelectAttribute(event) {
        setSelectedAttribute(event.target.value);
    }

    return (
        <>
            <Navbar/>
            <h1>Selection Query</h1>
            <h2>Search for any project(s)</h2>
            <div style={{display: "flex"}}>
                <div>
                    <div>
                        {queryParams.map((queryParam) => (
                            <div key={queryParam.id}>
                                {queryParam.id !== 0 &&
                                    <p style={{textAlign: "center", margin: "0.5em"}}>{queryParam.logicalOp}</p>
                                }
                                <QueryParam
                                    id={queryParam.id}
                                    attribute={queryParam.attribute}
                                    onInputChange={handleQueryInputChange}
                                />
                            </div>
                        ))}
                    </div>
                    <div style={{paddingTop: "1em", paddingBottom: "1em"}}>
                        <button title={"Add Query"} onClick={handleAddQueryParam}>Add Query Parameter</button>
                        <label htmlFor={"logical-operator"} style={{marginLeft: "1em"}}></label>
                        <select id={"logical-operator"} onChange={handleLogicalOpChange}>
                            <option value={"AND"}>AND</option>
                            <option value={"OR"}>OR</option>
                        </select>
                        <label htmlFor={"attributes"} style={{marginLeft: "1em"}}></label>
                        <select id={"attributes"} onChange={handleSelectAttribute}>
                            <option value={"projectName"}>Project Name</option>
                            <option value={"oUsername"}>Username</option>
                            <option value={"description"}>Description</option>
                            <option value={"balance"}>Balance</option>
                        </select>
                    </div>
                    <button title={"Fetch"} onClick={handleFetchSubmit} style={{marginRight: "1em"}}>Fetch</button>
                </div>
                <div style={{marginLeft: "3em", flexGrow: "1"}}>
                    <table>
                        <tbody>
                        <tr>
                            <th>Projects</th>
                        </tr>
                        {projectList.length <= 0 &&
                            <tr>
                                <td>No existing projects meet the given criteria</td>
                            </tr>
                        }
                        {projectList.map((projectName, index) => (
                            <tr key={index}>
                                <td key={index}>{projectName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Selection;