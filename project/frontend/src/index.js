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
import Project from "./pages/Project";
import Main from "./pages/Main";
import Projection from "./pages/Projection";
import Profile from "./pages/Profile";
import Organizations from "./pages/Organizations";
import Organization from "./pages/Organization";
import Join from "./pages/Join";
import Selection from "./pages/Selection";
import TopContributors from "./pages/TopContributors";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />,
    },
    {
        path: "/main",
        element: <Main />,
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
        path: "/projection",
        element: <Projection />
    },
    {
        path: "/organizations",
        element: <Organizations />
    },
    {
        path: "/organization/:orgId",
        element: <Organization />
    },
    {
        path: "/create/individual",
        element: <CreateIndividual />,
    },
    {
        path: "/create/organization",
        element: <CreateOrganization />,
    },
    {
        path: '/project/:projectId',
        element: <Project />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/join',
        element: <Join />,
    },
    {
        path: '/selection',
        element: <Selection />,
    },
    {
        path: '/leaderboard',
        element: <TopContributors />,
    }
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
