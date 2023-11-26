import React from "react";
function Card({ CCNumber }) {
    const [cardNumber, username, cvv, address, postalCode] = CCNumber;
    return (
        <>
            <p>{cardNumber}</p>
            <p>{cvv}</p>
            <p>{address}</p>
            <p>{postalCode}</p>
        </>
    );
}

export default Card;