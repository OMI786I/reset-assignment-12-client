import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root/Root.jsx";
import Home from "./Pages/Home.jsx";
import SearchDonor from "./Pages/SearchDonor.jsx";
import Request from "./Pages/Request.jsx";
import Registration from "./Pages/Registration.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Layout/Dashboard.jsx";
import PrivateRoute from "./Firebase/PrivateRoute.jsx";
import Profile from "./Dashboard/Profile.jsx";
import DonationRequest from "./Dashboard/DonationRequest.jsx";
import CreateDRequest from "./Dashboard/CreateDRequest.jsx";
import AllUsers from "./Dashboard/AllUsers.jsx";
import AllBloodDonationReq from "./Dashboard/AllBloodDonationReq.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/searchPage",
        element: <SearchDonor></SearchDonor>,
      },
      {
        path: "/donationRequests",
        element: <Request></Request>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "my-donation-request",
        element: <DonationRequest></DonationRequest>,
      },
      {
        path: "create-donation-request",
        element: <CreateDRequest></CreateDRequest>,
      },
      {
        path: "all-blood-donation-requests",
        element: <AllBloodDonationReq></AllBloodDonationReq>,
      },
      {
        path: "content-management",
        element: <AllBloodDonationReq></AllBloodDonationReq>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
