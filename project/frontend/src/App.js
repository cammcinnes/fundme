import React, { useState, useEffect } from 'react';
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() {
 // const [account, setAccount] = useState({type: null});

  // useEffect(() => {
  // }, [account]);
  return (
    // <div className="App">
    //   {account.type === null ? (<Welcome/>) :
    //     (<Login setAccount={setAccount}/>)}
    // </div>
      <Welcome />
  );
}

export default App;
