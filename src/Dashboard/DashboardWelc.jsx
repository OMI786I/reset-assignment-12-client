import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import RecentDonation from "../Component/Dashboard/RecentDonation";

const DashboardWelc = ({ isAdmin }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  console.log(data);

  // Check if the current route path is the dashboard root
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/donor?email=${user.email}`)
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user.email]);

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div>
        <div
          className="relative h-64 bg-gradient-to-r
      from-blue-400 to-purple-500 "
        >
          {/**overlay */}
          <div
            className="absolute inset-0 
          bg-gray-800 opacity-50 
          z-10"
          ></div>
          {/**background */}
          <div
            className="absolute inset-0 flex 
          items-center justify-center
          text-white z-20"
          >
            <div
              className="bg-gray-800 p-8 
              rounded-lg shadow-lg"
            >
              <h1 className="text-3xl font-bold mb-4">
                Welcome {data[0].name}{" "}
              </h1>

              <p className="text-lg">
                Check Out Your latest Donation requests!
              </p>
            </div>
          </div>
        </div>
        {!isAdmin ? (
          <div>
            <RecentDonation></RecentDonation>
          </div>
        ) : (
          ""
        )}
      </div>
    );
};

export default DashboardWelc;
