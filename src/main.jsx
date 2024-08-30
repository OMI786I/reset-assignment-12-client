import React from "react";
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
import DonationRequestsHome from "./Pages/DonationRequestsHome.jsx";
import DonationRequestsDetails from "./Pages/DonationRequestsDetails.jsx";
import BlogPage from "./Pages/BlogPage.jsx";
import BlogPageDetails from "./Pages/BlogPageDetails.jsx";
import Fund from "./Pages/Fund.jsx";
import FundingHome from "./Pages/Funding/FundingHome.jsx";
import FundForm from "./Pages/Funding/FundForm.jsx";
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
      {
        path: "/donationRequests",
        element: <DonationRequestsHome></DonationRequestsHome>,
      },
      {
        path: "/blog",
        element: <BlogPage></BlogPage>,
      },
      {
        path: "/fund",
        element: (
          <PrivateRoute>
            <FundingHome></FundingHome>
          </PrivateRoute>
        ),
      },
      {
        path: "/fundForm",
        element: (
          <PrivateRoute>
            <FundForm></FundForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/blogDetails/:id",
        element: <BlogPageDetails></BlogPageDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/blog/${params.id}`),
      },
      {
        path: "/donationRequestDetails/:id",
        element: (
          <PrivateRoute>
            <DonationRequestsDetails></DonationRequestsDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/requestDonor/${params.id}`),
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
