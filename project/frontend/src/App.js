import React, { useState, useEffect } from 'react';
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import './App.css';


function App() {
  const [account, setAccount] = useState({type: null});

  useEffect(() => {
  }, [account]);

  return (
    <div className="App">
      {account.type === null ? (<Login setAccount={setAccount}/>) :
        (<Welcome/>
      )}
    </div>
  );
}

export default App;
