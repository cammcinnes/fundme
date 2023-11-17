import React, {useState} from 'react';
import '../App.css';
import CreateAccount from '../components/CreateAccount'

function CreateIndividual() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [dob, setDOB] = useState("");

    return(
        <div>
            <CreateAccount />
            <div className={'personal-info'}>
                <h3>Personal Information</h3>
                <label>First Name:
                    <input
                        type='test'
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
        </div>
    );
}

export default CreateIndividual;