import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../utils";

function Profile() {
    const URL = process.env.REACT_APP_URL;
    const [accountType, setAccountType] = useState(null);
    const navigate = useNavigate();
    const [ccNumber, setCCNumber] = useState("");
    const [cvv, setCVV] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");

    useEffect(() => {
        const isLoggedIn = async () => {
            const token = localStorage.getItem("token");
            const result = await checkAuth(token);
            if (result === null) {
                navigate("/login");
            } else {
                setAccountType(result)
            }
        }
        isLoggedIn();
    }, [])

    const handlePaymentCreation = async () => {
        try {
            const response = await fetch(URL + "/payment/insert-payment", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ ccNumber, cvv, address, postalCode, city, province})
            });
            const parsedResponse = await response.json();
            if (parsedResponse.success === true) {
                alert("Successfully Added Payment Info!");
            } else {
                alert(parsedResponse.error);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    if (accountType === 'individual'){
        return (
            <div className={'payment'}>
                <h1>Payment Information</h1>
                <label>Credit Card Number:
                    <input
                        type={'text'}
                        name={'insertCCNumber'}
                        placeholder={'enter credit card number here'}
                        minLength={16}
                        maxLength={16}
                        value={ccNumber}
                        onChange = {e => setCCNumber(e.target.value)}
                    />
                </label>
                <br/>
                <label>CVV:
                    <input
                        type={'text'}
                        name={'insertCVV'}
                        placeholder={'enter security code here'}
                        minLength={3}
                        maxLength={3}
                        value={cvv}
                        onChange = {e => setCVV(e.target.value)}
                    />
                </label>
                <br/>
                <label>Address:
                    <input
                        type={'text'}
                        name={'insertAddress'}
                        placeholder={'enter address here'}
                        maxLength={50}
                        value={address}
                        onChange = {e => setAddress(e.target.value)}
                    />
                </label>
                <br/>
                <label>PostalCode:
                    <input
                        type={'text'}
                        name={'insertPostalCode'}
                        placeholder={'enter postal code here'}
                        minLength={6}
                        maxLength={6}
                        value={postalCode}
                        onChange = {e => setPostalCode(e.target.value)}
                    />
                </label>
                <br/>
                <label>City:
                    <input
                        type={'text'}
                        name={'insertCity'}
                        placeholder={'enter city here'}
                        maxLength={50}
                        value={city}
                        onChange = {e => setCity(e.target.value)}
                    />
                </label>
                <br/>
                <label>Province:
                    <input
                        type={'text'}
                        name={'insertProvince'}
                        placeholder={'enter province here'}
                        maxLength={2}
                        value={province}
                        onChange = {e => setProvince(e.target.value)}
                    />
                </label>
                <br/>
                <button onClick={handlePaymentCreation}>Add Payment Info</button>
            </div>
        );
    }
}

export default Profile;