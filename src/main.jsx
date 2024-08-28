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
import MyDonationRequest from "./Dashboard/MyDonationRequest.jsx";
import CreateDRequest from "./Dashboard/CreateDRequest.jsx";
import AllUsers from "./Dashboard/AllUsers.jsx";
import AllBloodDonationReq from "./Dashboard/AllBloodDonationReq.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyDonationEdit from "./Dashboard/MyDonationEdit.jsx";
import MyDonationDetails from "./Dashboard/MyDonationDetails.jsx";
import AdminDashboard from "./Dashboard/AdminDashboard.jsx";
import AdminDonationEdit from "./Dashboard/AdminDonationEdit.jsx";
import ContentManagement from "./Dashboard/ContentManagement.jsx";
import BlogForm from "./Dashboard/BlogForm.jsx";
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
        path: "/MyDonationRequests",
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
        element: <MyDonationRequest></MyDonationRequest>,
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
        path: "adminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "content-management",
        element: <ContentManagement></ContentManagement>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "blogForm",
        element: <BlogForm></BlogForm>,
      },
      {
        path: "myDonationEdit/:id",
        element: <MyDonationEdit></MyDonationEdit>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/requestDonor/${params.id}`),
      },
      {
        path: "adminDonationEdit/:id",
        element: <AdminDonationEdit></AdminDonationEdit>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/requestDonor/${params.id}`),
      },
      {
        path: "myDonationDetails/:id",
        element: <MyDonationDetails></MyDonationDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/requestDonor/${params.id}`),
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
