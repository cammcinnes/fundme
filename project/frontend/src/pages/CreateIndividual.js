import React, {useState} from 'react';
import '../App.css';
import CreateAccount from '../components/CreateAccount'
import { useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_URL;

function CreateIndividual() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [dob, setDOB] = useState("");



    const handleIndividualCreation = async () => {
        const type = 'individual';
        const options = {dob, firstname, lastname};
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
            <h2>Create your Personal Account</h2>
            <CreateAccount email={email}
                           setEmail={setEmail}
                           username={username}
                           setUsername={setUsername}
                           password={password}
                           setPassword={setPassword}
                           password2={password2}
                           setPassword2={setPassword2}/>
            <div className={'personal-info'}>
                <h3>Personal Information</h3>
                <label>First Name:
                    <input
                        type='text'
                        name='insertFirstName'
                        placeholder='enter name here'
                        maxLength={50}
                        value={firstname}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <br/>
                </label>
                <label>Last Name:
                    <input
                        type='text'
                        name='insertLastName'
                        placeholder='enter last name here'
                        maxLength={50}
                        value={lastname}
                        onChange={e => setLastName(e.target.value)}
                    />
                </label>
                <br/>
                <label>Date of Birth:
                    <input
                        type='date'
                        name='insertDOB'
                        placeholder='YYYY-MM-DD'
                        value={dob}
                        onChange={e => setDOB(e.target.value)}
                    />
                </label>
            </div>
            <button type={"submit"} value={'submit'} onClick={handleIndividualCreation}>Create</button>
        </div>
    );
}

export default CreateIndividual;