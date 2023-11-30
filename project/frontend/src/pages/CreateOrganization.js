import React, {useState} from 'react';
import '../App.css';
import CreateAccount from '../components/CreateAccount'
import {useNavigate} from "react-router-dom";

const URL = process.env.REACT_APP_URL;

function CreateOrganization() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [orgName, setOrgName] = useState("");
    const [foundedDate, setFoundedDate] = useState("");

    const handleOrganizationCreation = async () => {
        const type = 'organization';
        const options = {foundedDate, orgName};
        if (password !== password2) {
            alert("Passwords don't match!");
        } else {
            try {
                const response = await fetch(URL + "/auth/register", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({username, password, email, type, options})
                });
                const parsedResponse = await response.json();
                if (parsedResponse.success === true) {
                    alert("Account has been created. Proceed to login page.");
                    navigate("/welcome")
                } else {
                    alert(parsedResponse.error);
                }
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return(
        <div>
            <h2>Create an Organization Account</h2>
            <CreateAccount email={email}
                           setEmail={setEmail}
                           username={username}
                           setUsername={setUsername}
                           password={password}
                           setPassword={setPassword}
                           password2={password2}
                           setPassword2={setPassword2}/>
            <div className={'organization-info'}>
                <h3>Organization Information</h3>
                <label>Name:
                    <input
                        type='text'
                        name='insertOrgName'
                        placeholder='enter organization name here'
                        maxLength={50}
                        value={orgName}
                        onChange={e => setOrgName(e.target.value)}
                    />
                </label>
                <br/>
                <label>Date of Creation:
                    <input
                        type='date'
                        name='insertCreationDate'
                        placeholder='YYYY-MM-DD'
                        value={foundedDate}
                        onChange={e => setFoundedDate(e.target.value)}
                    />
                </label>
            </div>
            <button type={"submit"} value={'submit'} onClick={handleOrganizationCreation}>Create</button>
        </div>
    );
}

export default CreateOrganization;