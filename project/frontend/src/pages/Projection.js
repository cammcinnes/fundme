import React, { useEffect, useState } from 'react';
import { checkAuth } from "../utils";
import { useNavigate } from "react-router-dom";
import '../App.css';
import Navbar from "../components/Nav";

function Projection() {
  const URL = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState(null);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [result, setResult] = useState([]);

  const getTableNames = async () => {
    const response  = await fetch(URL + "/projection");
    const parsedResponse = await response.json();
    if (parsedResponse.success === true) {
      setTables(parsedResponse.result.tableNames.map((name) => name[0]));
    } else {
      alert("Error getting tables: " + parsedResponse.error);
    }
  };

  const getTableAttributes = async (table) => {
    const response = await fetch(`${URL}/projection/attributes/${table}`);
    const parsedResponse = await response.json();
    if (parsedResponse.success === true) {
      setAttributes(parsedResponse.result.tableAttributes.map((name) => name[0]));
    } else {
      alert("Error getting table's attributes: " + parsedResponse.error);
    }
  };

  const getResult = async (table, attributes) => {
    const response = await fetch(`${URL}/projection`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ table, attributes })
    });
    const parsedResponse = await response.json();
    if (parsedResponse.success === true) {
      setResult(parsedResponse.result);
    } else {
      alert("Error running query: " + parsedResponse.error);
    }
  }

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
    getTableAttributes(event.target.value);
    setSelectedAttributes([]);
  };

  const handleAttrChange = async (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    if (checked) {
      setSelectedAttributes([ ...selectedAttributes, value ]);
    } else {
      setSelectedAttributes(selectedAttributes.filter((attr) => attr != value));
    }
  };

  useEffect(() => {
    const isLoggedIn = async () => {
      const token = localStorage.getItem("token");
      const result = await checkAuth(token);
      if (result === null) {
        navigate("/login");
      } else {
        setAccountType(result);
        getTableNames();
      }
    }
    isLoggedIn();
  }, [])

  useEffect(() => {
    if (tables[0]) {
      setSelectedTable(tables[0]);
      getTableAttributes(tables[0]);
    }
  }, [tables])

  useEffect(() => {
    if (selectedAttributes.length > 0 && selectedTable) {
      getResult(selectedTable, selectedAttributes);
    } else {
      setResult([]);
    }
  }, [selectedAttributes]);

  return (
    <>
      <Navbar />
      <div>
        <h3>Projection page</h3>
        <div className="projection-container">
          <div>
            <h3>Select table:</h3>
            <select onChange={handleTableChange}>
              { tables.map((table) =>
                (
                  <option value={table} key={table}>{table}</option>
                )
              )}
            </select>
          </div>
          <div>
            <h3>Select attributes:</h3>
            <form>
              { attributes.map((attr) =>
                (
                  <div key={`${selectedTable}-${attr}`}>
                    <label>{attr}</label>
                    <input className="attr-check" type="checkbox" name={attr} value={attr} onChange={handleAttrChange}/>
                  </div>
                )
              )}
            </form>
          </div>
        </div>
        { selectedAttributes.length > 0 && selectedTable &&
          <div className="projection-list">
            <h3>Results:</h3>
            <table>
              <thead>
                <tr>{ selectedAttributes.map((attr) => (<th key={attr}>{ attr }</th>)) }</tr>
              </thead>
              <tbody>
                { result.map((tuple, i) => (<tr key={`${selectedTable}-${i}}`}>
                  { tuple.map((data, j) => (<td key={`${selectedTable}-${i}-${j}`}>{data}</td>)) }
                </tr>)) }
              </tbody>
            </table>
          </div>
        }
      </div>
    </>
  );
}
export default Projection;
