import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaFile, FaSearch } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MyDonationRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  console.log(data);
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/requestDonor?requesterEmail=${user.email}`)
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user.email]);

  return (
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
                <td>
                  <Link to={`/dashboard/myDonationEdit/${res._id}`}>
                    <button className="btn btn-neutral">
                      <FaFile />
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-neutral">
                    <FaDeleteLeft />
                    Delete
                  </button>
                </td>
                <td>
                  <button className="btn btn-neutral">
                    <FaSearch />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonationRequest;
