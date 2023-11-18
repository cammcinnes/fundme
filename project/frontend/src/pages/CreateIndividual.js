import React, {useState} from 'react';
import '../App.css';
import CreateAccount from '../components/CreateAccount'

function CreateIndividual() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [dob, setDOB] = useState("");

    const handleIndividualCreation = async () => {
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