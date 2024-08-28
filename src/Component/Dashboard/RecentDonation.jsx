import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const RecentDonation = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `http://localhost:5000/requestDonor?requesterEmail=${user.email}&limit=3`
      )
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user.email]);

  console.log(data);

  if (data.length === 0) {
    return (
      <p className="text-3xl text-center">
        Create Donation Requests to see here
      </p>
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
        <h1 className="text-3xl text-center p-3">Recent Donation Requests</h1>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Recipient Name</th>
                  <th>Recipient location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Donation status</th>
                  <th>Donor Information</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {data.map((res, index) => (
                  <tr key={res._id} className="bg-base-200">
                    <th>{index + 1}</th>
                    <td>{res.recipientName}</td>
                    <td>
                      {res.district} , {res.upazilla}
                    </td>
                    <td>{res.donationDate}</td>
                    <td>{res.donationTime}</td>
                    <td>{res.donationStatus}</td>
                    <td>donor Information</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Link to={"/dashboard/my-donation-request"}>
          <div className="flex justify-center">
            {" "}
            <button className="btn btn-neutral">View All</button>
          </div>
        </Link>
      </div>
    );
};

export default RecentDonation;
