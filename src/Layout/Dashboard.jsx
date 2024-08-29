import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { TbBrandBooking, TbDashboard, TbUser } from "react-icons/tb";
import { IoIosDocument } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { Toaster } from "react-hot-toast";
import DashboardWelc from "../Dashboard/DashboardWelc";
import useAdmin from "../CustomHook/useAdmin";
import useVolunteer from "../CustomHook/useVolunteer";
import { VscLayoutSidebarRight } from "react-icons/vsc";
import React from "react";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";

const Dashboard = () => {
  const location = useLocation();
  const isDashboardRoot = location.pathname === "/dashboard";
  const [isAdmin] = useAdmin();
  const { isVolunteer } = useVolunteer();
  console.log(isVolunteer);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="hidden w-full md:w-[25%] md:flex flex-col bg-neutral text-white h-full md:h-screen">
        <ul className="menu p-4 text-xs md:text-[14px] lg:text-lg">
          <li>
            <NavLink to={"/dashboard"} className="flex items-center">
              <RxDashboard className="mr-2" />
              Dashboard
            </NavLink>
          </li>

          {isAdmin || isVolunteer ? (
            <>
              {isAdmin ? (
                <li>
                  <NavLink
                    to={"/dashboard/all-users"}
                    className="flex items-center"
                  >
                    <TbUser className="mr-2" />
                    All Users
                  </NavLink>
                </li>
              ) : (
                ""
              )}

              <li>
                <NavLink
                  to={"/dashboard/all-blood-donation-requests"}
                  className="flex items-center"
                >
                  <TbBrandBooking className="mr-2" />
                  All blood donation requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/content-management"}
                  className="flex items-center"
                >
                  <TbDashboard className="mr-2" />
                  Content management
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to={"/dashboard/profile"}
                  className="flex items-center"
                >
                  <FaHome className="mr-2" />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/my-donation-request"}
                  className="flex items-center"
                >
                  <FaCalendar className="mr-2" />
                  My Donation Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/create-donation-request"}
                  className="flex items-center"
                >
                  <IoIosDocument className="mr-2" />
                  Create Donation Request
                </NavLink>
              </li>
            </>
          )}
          <div className="divider divider-warning text-white"></div>
          <li>
            <NavLink to={"/"} className="flex items-center">
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      {/** drawer */}
      <div>
        {" "}
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="bla bla bla"
        >
          <div className="  w-full md:flex flex-col bg-neutral text-white h-full md:h-screen">
            <ul className="menu p-4 text-xs md:text-[14px] lg:text-lg">
              <li>
                <NavLink to={"/dashboard"} className="flex items-center">
                  <RxDashboard className="mr-2" />
                  Dashboard
                </NavLink>
              </li>

              {isAdmin || isVolunteer ? (
                <>
                  {isAdmin ? (
                    <li>
                      <NavLink
                        to={"/dashboard/all-users"}
                        className="flex items-center"
                      >
                        <TbUser className="mr-2" />
                        All Users
                      </NavLink>
                    </li>
                  ) : (
                    ""
                  )}

                  <li>
                    <NavLink
                      to={"/dashboard/all-blood-donation-requests"}
                      className="flex items-center"
                    >
                      <TbBrandBooking className="mr-2" />
                      All blood donation requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/content-management"}
                      className="flex items-center"
                    >
                      <TbDashboard className="mr-2" />
                      Content management
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to={"/dashboard/profile"}
                      className="flex items-center"
                    >
                      <FaHome className="mr-2" />
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/my-donation-request"}
                      className="flex items-center"
                    >
                      <FaCalendar className="mr-2" />
                      My Donation Request
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/create-donation-request"}
                      className="flex items-center"
                    >
                      <IoIosDocument className="mr-2" />
                      Create Donation Request
                    </NavLink>
                  </li>
                </>
              )}
              <div className="divider divider-warning text-white"></div>
              <li>
                <NavLink to={"/"} className="flex items-center">
                  <FaHome className="mr-2" />
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </Drawer>
      </div>
      {/* Dashboard content */}
      <div className="flex-1 w-full md:w-[80%] text-xs md:text-[14px] lg:text-lg overflow-y-auto">
        <button
          onClick={toggleDrawer}
          className="flex md:hidden btn btn-neutral"
        >
          <VscLayoutSidebarRight />
          Sidebar
        </button>
        {isDashboardRoot && (
          <DashboardWelc isAdmin={isAdmin} isVolunteer={isVolunteer} />
        )}
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
