import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
function Card({ CCNumber }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [postalCode, cardNumber, username, cvv, address, city, province] = CCNumber;
    const [newCCNumber, setNewCCNumber] = useState('');
    const [newCVV, setNewCVV] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPostalCode, setNewPostalCode] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newProvince, setNewProvince] = useState('');

    const updateInfo = async () => {
        try {
            const response = await fetch(URL + "/payment/update-payment", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({newCCNumber, username, newCVV, newAddress, newPostalCode, newCity, newProvince})
            });
            const parsedResponse = await response.json();
            if (parsedResponse.success === true) {
                alert("Successfully Updated Payment Info!");
            } else {
                alert(parsedResponse.error);
            }
        } catch (error) {
            alert(error.message);
        }
        setIsOpen(false);
    }
    const modifyPaymentInfo = () => {
        setIsOpen(true);
    }
    return (
        <>
            {isOpen && (
                <div>
                    <label>{cardNumber} ->
                        <input
                            type={'text'}
                            name={'insertNewCCNumber'}
                            placeholder={'enter credit card number here'}
                            minLength={16}
                            maxLength={16}
                            value={newCCNumber}
                            onChange = {e => setNewCCNumber(e.target.value)}
                        />
                    </label>
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