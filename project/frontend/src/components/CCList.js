import React, { useState, useEffect } from 'react';
import '../App.css';
import Card from "./Card";
import {useParams} from "react-router-dom";

const URL = process.env.REACT_APP_URL;

function CCList({user}) {
    const [CCNumbers, setCCNumbers] = useState([]);
    useEffect(() => {
        async function fetchCCNumbers(user) {
            const response = await fetch(URL + `/payment/${user}`, {
                method: "GET"
            });
            const cardData = await response.json();
            if (cardData.success) {
                setCCNumbers(cardData.result);
            }
        }
        fetchCCNumbers(user);
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