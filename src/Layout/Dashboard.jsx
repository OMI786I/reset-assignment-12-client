import { NavLink, Outlet } from "react-router-dom";
import { FaCalendar, FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
const Dashboard = () => {
  return (
    <div className="flex">
      {/*dash boardside bar */}
      <div className="w-64 min-h-full bg-orange-400">
        <ul className="menu">
          <li>
            <NavLink to={"/dashboard/userHome"}>
              <FaHome />
              User Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/reservation"}>
              <FaCalendar />
              Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/cart"}>
              <FaShoppingCart />
              My Cart
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/review"}>
              <MdOutlineReviews />
              Add review
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/bookings"}>
              <TbBrandBooking />
              My bookings
            </NavLink>
          </li>
        </ul>
      </div>
      {/*Dashboard content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
