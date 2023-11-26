import React from "react";
function Card({ CCNumber }) {
    const [cardNumber, username, cvv, address, postalCode] = CCNumber;
    return (
        <>
            <p>{CCNumber}</p>
            <p>{cvv}</p>
            <p>{address}</p>
            <p>{postalCode}</p>
        </>
    );
}

export default Card;