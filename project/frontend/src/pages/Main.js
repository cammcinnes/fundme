import React, { useEffect, useState } from 'react';
import { checkAuth } from "../utils";
import { useNavigate } from "react-router-dom";
import '../App.css';
import Navbar from "../components/Nav";

function Main() {
  const [accountType, setAccountType] = useState(null);
  const navigate = useNavigate();
  // we use this effect for pages that require authentication!
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

  return (
    <>
      <Navbar />
      <div>
        Main page. Account type : { accountType }
      </div>
    </>
  );
}
export default Main;
