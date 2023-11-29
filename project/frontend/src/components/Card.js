import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
function Card({ CCNumber }) {
    const URL = process.env.REACT_APP_URL;
    const [isOpen, setIsOpen] = useState(false);
    const [postalCode, cardNumber, username, cvv, address, city, province] = CCNumber;
    const [newCVV, setNewCVV] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPostalCode, setNewPostalCode] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newProvince, setNewProvince] = useState('');

    const updateInfo = async () => {
        if (!newCVV && !newAddress && !newPostalCode && !newProvince && !newCity) {
            alert("CVV, Address or Postal Code is required");
        } else {
            try {
                const response = await fetch(URL + "/payment/update-payment", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({cardNumber, username, newCVV, newAddress, postalCode, newPostalCode, newCity, newProvince, city, province}),
                });
                const parsedResponse = await response.json();
                if (parsedResponse.success === true) {
                    alert("Successfully Updated Payment Info!");
                    window.location.reload(false);
                } else {
                    alert(parsedResponse.error);
                }
            } catch (error) {
                alert(error.message);
            }
            setIsOpen(false);
            setNewCVV("");
            setNewAddress("");
            setNewProvince("");
            setNewCity("");
            setNewPostalCode("");
        }
    }
    const modifyPaymentInfo = () => {
        setIsOpen(true);
    }
    return (
        <>
            {isOpen && (
                <div>
                    {cardNumber}
                    <br/>
                    <label>{cvv} ->
                        <input
                            type={'text'}
                            name={'insertNewCVV'}
                            placeholder={'enter security code here'}
                            minLength={3}
                            maxLength={3}
                            value={newCVV}
                            onChange = {e => setNewCVV(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label>{address} ->
                        <input
                            type={'text'}
                            name={'insertNewAddress'}
                            placeholder={'enter address here'}
                            maxLength={50}
                            value={newAddress}
                            onChange = {e => setNewAddress(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label>{postalCode} ->
                        <input
                            type={'text'}
                            name={'insertNewPostalCode'}
                            placeholder={'enter postal code here'}
                            minLength={6}
                            maxLength={6}
                            value={newPostalCode}
                            onChange = {e => setNewPostalCode(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label>{city} ->
                        <input
                            type={'text'}
                            name={'insertNewCity'}
                            placeholder={'enter city here'}
                            maxLength={50}
                            value={newCity}
                            onChange = {e => setNewCity(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label>{province} ->
                        <input
                            type={'text'}
                            name={'insertNewProvince'}
                            placeholder={'enter province here'}
                            maxLength={2}
                            value={newProvince}
                            onChange = {e => setNewProvince(e.target.value)}
                        />
                    </label>
                    <br/>
                    <button onClick={updateInfo}>Confirm</button>
                </div>
            )
            }
            {!isOpen && (
                <div>
                    <p>CCNumber: {cardNumber}</p>
                    <p>CVV: {cvv}</p>
                    <p>Address: {address}</p>
                    <p>Postal Code: {postalCode}</p>
                    <p>City: {city}</p>
                    <p>Province: {province}</p>
                    <button onClick={modifyPaymentInfo}>Modify</button>
                </div>
            )
            }
        </>
    );
}

export default Card;
