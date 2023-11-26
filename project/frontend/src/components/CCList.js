import React, { useState, useEffect } from 'react';
import '../App.css';
import Project from "./Project";
import Card from "./Card";

function CCList() {
    const [CCNumbers, setCCNumbers] = useState([]);

    useEffect(() => {
        async function fetchCCNumbers() {
            const response = await fetch(URL + '/payment/cards', {
                method: "GET"
            });
            const cardData = await response.json();
            if (cardData.success) {
                setCCNumbers(cardData.result);
            }
        }
        fetchCCNumbers();
    }, []);

    return (
        <>
            {CCNumbers.map((CCNumber, index) => (
                <Card key={index} CCNumber={CCNumber} />
            ))}
        </>
    );
}
export default CCList;