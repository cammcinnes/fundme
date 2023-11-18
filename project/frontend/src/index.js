import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import ChooseAccountType from "./pages/ChooseAccountType";
import CreateIndividual from "./pages/CreateIndividual";
import CreateOrganization from "./pages/CreateOrganization";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/create",
        element: <ChooseAccountType />,
    },
    {
        path: "/create/individual",
        element: <CreateIndividual />,
    },
    {
        path: "/create/organization",
        element: <CreateOrganization />,
    },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
