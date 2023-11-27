import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
function Card({ CCNumber }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [cardNumber, username, cvv, address, postalCode] = CCNumber;
    const [newCCNumber, setNewCCNumber] = useState('');
    const [newCVV, setNewCVV] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPostalCode, setNewPostalCode] = useState('');

    const updateInfo = () => {

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
                            name={'insertCCNumber'}
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
                            name={'insertCVV'}
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
                            name={'insertAddress'}
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
                            name={'insertPostalCode'}
                            placeholder={'enter postal code here'}
                            minLength={6}
                            maxLength={6}
                            value={newPostalCode}
                            onChange = {e => setNewPostalCode(e.target.value)}
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
                    <button onClick={modifyPaymentInfo}>Modify</button>
                </div>
            )
            }
        </>
    );
}

export default Card;