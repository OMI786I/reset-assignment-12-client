import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { RxDashboard } from "react-icons/rx";
import { HiLogout } from "react-icons/hi";
import { BiLogInCircle } from "react-icons/bi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleSignOut = () => {
    logout();
  };
  const navLink = (
    <div className="flex-row md:flex-col gap-6  ">
      <NavLink to="/">
        <button className="hover:border-red-500 border-transparent  duration-150 hover:text-red-500 font-bold p-2  focus:border-red-500 focus:text-red-500">
          Home
        </button>
      </NavLink>
      <NavLink to="/donationRequests">
        <button className="hover:border-red-500 border-transparent  duration-150 hover:text-red-500 font-bold p-2  focus:border-red-500 focus:text-red-500">
          Donation requests
        </button>
      </NavLink>
      <NavLink to="/blog">
        <button className="hover:border-red-500 border-transparent  duration-150 hover:text-red-500 font-bold p-2  focus:border-red-500 focus:text-red-500">
          Blog
        </button>
      </NavLink>
    </div>
  );
  const navLink2 = (
    <div className="flex-row md:flex-col gap-6  ">
      <NavLink to="/">
        <button className="hover:border-red-500 border-transparent  duration-150 hover:text-red-500 font-bold p-2  focus:border-red-500 focus:text-red-500">
          Home
        </button>
      </NavLink>
      <NavLink to="/donationRequests">
        <button className="hover:border-red-500 border-transparent  duration-150 hover:text-red-500 font-bold p-2  focus:border-red-500 focus:text-red-500">
          Donation requests
        </button>
      </NavLink>
      <NavLink to="/blog">
        <button className="hover:border-red-500 border-transparent  duration-150 hover:text-red-500 font-bold p-2  focus:border-red-500 focus:text-red-500">
          Blog
        </button>
      </NavLink>
      <NavLink to="/fund">
        <button className="hover:border-red-500 border-transparent  duration-150 hover:text-red-500 font-bold p-2  focus:border-red-500 focus:text-red-500">
          Funding
        </button>
      </NavLink>
    </div>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {user ? navLink2 : navLink}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <img
              src="../../Resources/—Pngtree—blood liquid water drop check_4978836.png"
              className="w-8"
            ></img>
            <p>RedLife</p>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {" "}
            {user ? navLink2 : navLink}
          </ul>
        </div>

        {user ? (
          <div className="navbar-end ">
            {" "}
            <div className="dropdown dropdown-end  ">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-16 rounded-full">
                  <img src={user.photoURL}></img>
                </div>
              </label>

              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <Link to={"/dashboard"}>
                    <button className="flex items-center gap-2">
                      <RxDashboard />
                      Dashboard
                    </button>
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>
                    <HiLogout />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <p className="hidden md:flex">{user.displayName}</p>
          </div>
        ) : (
          <div className="navbar-end">
            <Link to={"/login"}>
              <button className="btn btn-neutral">
                <BiLogInCircle />
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
