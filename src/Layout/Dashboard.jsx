import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaCalendar, FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { TbBrandBooking, TbDashboard, TbUser } from "react-icons/tb";
import { IoIosDocument } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { RxDashboard } from "react-icons/rx";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import DashboardWelc from "../Dashboard/DashboardWelc";
const Dashboard = () => {
  const location = useLocation();
  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <div className="flex h-screen">
      {/*dash boardside bar */}
      <div className="w-[42%] md:w-[20%]  md:text-xl flex flex-col h-full bg-neutral text-white">
        <ul className="menu text-xs md:text-[14px] lg:text-lg">
          <li>
            <NavLink to={"/dashboard"}>
              <RxDashboard />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/profile"}>
              <FaHome />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/my-donation-request"}>
              <FaCalendar />
              My Donation Request
            </NavLink>
          </li>

          <li>
            <NavLink to={"/dashboard/create-donation-request"}>
              <IoIosDocument />
              Create Donation Request
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/all-users"}>
              <TbUser />
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/all-blood-donation-requests"}>
              <TbBrandBooking />
              All blood donation requests
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/content-management"}>
              <TbDashboard />
              Content management
            </NavLink>
          </li>
        </ul>
      </div>
      {/*Dashboard content */}
      <div className="flex-1 w-[80%]   text-xs md:text-[14px] lg:text-lg h-full">
        {isDashboardRoot && <DashboardWelc></DashboardWelc>}
        <Toaster></Toaster>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
