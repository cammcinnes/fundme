import React, {useEffect, useState} from "react";

function QueryParam({ id, onInputChange }) {
    const [projectName, setProjectName] = useState("");
    const [projectNameOp, setProjectNameOp] = useState("");
    const [oUsername, setOUsername] = useState("");
    const [oUsernameOp, setOUsernameOp] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionOp, setDescriptionOp] = useState("");
    const [balance, setBalance] = useState(-1);
    const [balanceOp, setBalanceOp] = useState("");

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        switch(id) {
            case "project-name-op":
                setProjectNameOp(value);
                break;
            case "project-name-input":
                setProjectName(value);
                break;
            case "ousername-op":
                setOUsernameOp(value);
                break;
            case "ousername-input":
                setOUsername(value);
                break;
            case "description-op":
                setDescriptionOp(value);
                break;
            case "description-input":
                setDescription(value);
                break;
            case "balance-op":
                setBalanceOp(value);
                break;
            case "balance-input":
                setBalance(value);
                break;
            default:
                break;
        }
    };

    function parseInputData() {
        return {
            projectName: `${projectName}`,
            projectNameOp: `${projectNameOp}`,
            oUsername: `${oUsername}`,
            oUsernameOp: `${oUsernameOp}`,
            description: `${description}`,
            descriptionOp: `${descriptionOp}`,
            balance: balance,
            balanceOp: `${balanceOp}`
        }
    }

    useEffect(() => {
        const queryData = parseInputData();
        onInputChange(id, queryData);
    }, [projectName, oUsername, description, balance]);

    const attributeStyle = {
        padding: "0.2em"
    }

    return (
        <>
            <div style={{
                backgroundColor: "#f5f5f5",
                padding: "0.7em",
                width: "fit-content",
                borderRadius: "0.35em",
                boxShadow: "0.15em 0.15em 0.3em rgba(0,0,0,0.07)"
            }}>
                <div style={attributeStyle}>
                    <label htmlFor={"project-name-op"}>Project Name: </label>
                    <select
                        id={"project-name-op"}
                        onChange={handleInputChange}
                    >
                        <option value={""}></option>
                        <option value={"="}>equals</option>
                        <option value={"LIKE"}>includes</option>
                    </select>
                    <input
                        id={"project-name-input"}
                        type={"text"}
                        value={projectName}
                        onChange={handleInputChange}
                        style={{marginLeft: "0.5em"}}
                        placeholder={"enter project name"}
                    />
                </div>
                <div style={attributeStyle}>
                    <label htmlFor={"ousername-op"}>Organization Username: </label>
                    <select
                        id={"ousername-op"}
                        onChange={handleInputChange}
                    >
                        <option value={""}></option>
                        <option value={"="}>equals</option>
                        <option value={"LIKE"}>includes</option>
                    </select>
                    <input
                        id={"ousername-input"}
                        type={"text"}
                        value={oUsername}
                        onChange={handleInputChange}
                        style={{marginLeft: "0.5em"}}
                        placeholder={"enter username"}
                    />
                </div>
                <div style={attributeStyle}>
                    <label htmlFor={"description-op"}>Description: </label>
                    <select
                        id={"description-op"}
                        onChange={handleInputChange}
                    >
                        <option value={""}></option>
                        <option value={"="}>equals</option>
                        <option value={"LIKE"}>includes</option>
                    </select>
                    <input
                        id={"description-input"}
                        type={"text"}
                        value={description}
                        onChange={handleInputChange}
                        style={{marginLeft: "0.5em"}}
                        placeholder={"enter description"}
                    />
                </div>
                <div style={attributeStyle}>
                    <label htmlFor={"balance-op"}>Balance: </label>
                    <select
                        id={"balance-op"}
                        onChange={handleInputChange}
                    >
                        <option value={""}></option>
                        <option value={"="}>&#61;</option>
                        <option value={"<"}>&lt;</option>
                        <option value={">"}>&gt;</option>
                        <option value={"<="}>&lt;&#61;</option>
                        <option value={">="}>&gt;&#61;</option>
                    </select>
                    <input
                        id={"balance-input"}
                        type={"number"}
                        value={balance}
                        onChange={handleInputChange}
                        style={{marginLeft: "0.5em"}}
                        placeholder={"enter balance"}
                    />
                </div>
            </div>
        < />
    );
}

export default QueryParam;