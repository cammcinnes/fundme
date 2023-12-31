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
    const [queryParams, setQueryParams] = useState([]);

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

    function validateQueryParams(queryParams) {
        for (const queryParam of queryParams) {
            const {
                projectName,
                projectNameOp,
                oUsername,
                oUsernameOp,
                description,
                descriptionOp,
                balance,
                balanceOp
            } = queryParam.queryData;
            if ((!projectName || !projectNameOp) && (!oUsername || !oUsernameOp) && (!description || !descriptionOp) && !(balanceOp))
                return false;
        }
        return true;
    }

    async function handleFetchSubmit() {
        try {
            if (!validateQueryParams(queryParams)) {
                alert("All fields in each query parameter must be provided.");
                return;
            }
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
                        {queryParams.length > 0 &&
                            <select id={"logical-operator"}
                                    onChange={(e) => {
                                        setLogicalOp(e.target.value)
                                    }}
                            >
                                <option value={"AND"}>AND</option>
                                <option value={"OR"}>OR</option>
                            </select>
                        }
                        <label htmlFor={"attributes"} style={{marginLeft: "1em"}}></label>
                        <select id={"attributes"}
                                onChange={(e) => setSelectedAttribute(e.target.value)}
                        >
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
                            <th style={{textAlign: "left"}}>Projects</th>
                            <th style={{textAlign: "left"}}>Username</th>
                            <th style={{textAlign: "left"}}>Description</th>
                            <th style={{textAlign: "left"}}>Balance</th>
                        </tr>
                        {projectList.length <= 0 &&
                            <tr>
                                <td>No existing projects meet the given criteria</td>
                            </tr>
                        }
                        {projectList.map((projectName, index) => (
                            <tr key={index}>
                                {projectName.map((attr, index) => (
                                    <td key={index}>{attr}</td>
                                ))}
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