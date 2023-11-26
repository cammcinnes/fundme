import React, { useEffect, useState } from 'react';
import { checkAuth } from "../utils";
import { useNavigate } from "react-router-dom";
import '../App.css';
import ProjectList from "../components/ProjectList";
import Navbar from "../components/Nav";

function Main() {
  const [accountType, setAccountType] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  // we use this effect for pages that require authentication!
  useEffect(() => {
    const isLoggedIn = async () => {
      const token = localStorage.getItem("token");
      const [result, username] = await checkAuth(token);
      if (result === null) {
        navigate("/login");
      } else {
        setAccountType(result)
        setUsername(username);
      }
    }
    isLoggedIn();
  }, [])

  return (
    <>
      <Navbar />
      <div>
        Main page. Account type : { accountType } Username: {username}
        
        <h1>Projects</h1>
        <ProjectList />
      </div>
    </>
  );
}
export default Main;
