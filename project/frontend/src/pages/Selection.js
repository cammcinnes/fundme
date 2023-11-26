import React, {useState, useEffect} from "react";
import { checkAuth } from "../utils";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";
import ProjectQuery from "../components/ProjectQuery";

function Selection() {
    const URL = process.env.REACT_APP_URL;
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState(null);

    useEffect(() => {
        const isLoggedIn = async () => {
            const token = localStorage.getItem("token");
            const result = await checkAuth(token);
            if (result === null) {
                navigate("/login");
            } else {
                setAccountType(result);
            }
        }
        isLoggedIn();
    }, [])

    function handleQueryInputChange(queryData) {

    }

    return (
        <>
            <Navbar />
            <div>
                <ProjectQuery onInputChange={handleQueryInputChange} />
            </div>
        </>
    );
}

export default Selection;