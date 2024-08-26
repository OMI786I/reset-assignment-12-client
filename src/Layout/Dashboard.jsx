import { NavLink, Outlet } from "react-router-dom";
import { FaCalendar, FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { TbBrandBooking, TbDashboard, TbUser } from "react-icons/tb";
import { IoIosDocument } from "react-icons/io";
const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/*dash boardside bar */}
      <div className="w-[42%] md:w-[20%]  md:text-xl h-full bg-neutral text-white">
        <ul className="menu text-xs md:text-[14px] lg:text-lg">
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
      <div className="flex-1 w-[80%]  text-xs md:text-[14px] lg:text-lg">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
