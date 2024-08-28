import axios from "axios";
import { useEffect, useState } from "react";
import { FaHandsHelping } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { IoPeopleOutline } from "react-icons/io5";
const AdminCard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/requestDonor`)
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/donor`)
      .then((assignment) => {
        setData2(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mx-5 my-5">
        <div className="card bg-primary text-primary-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">
              <FaHandsHelping />
              Total Donors
            </h2>
            <p className="text-4xl font-bold">{data2.length}</p>
            <p>Individuals have joined the cause.</p>
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">
              <GrMoney />
              Total Funding
            </h2>
            <p className="text-4xl font-bold">$45,678</p>
            <p>Raised to support blood donation drives.</p>
          </div>
        </div>

        <div className="card bg-accent text-accent-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">
              <IoPeopleOutline />
              Blood Donation Requests
            </h2>
            <p className="text-4xl font-bold">{data.length}</p>
            <p>Requests submitted for blood donations.</p>
          </div>
        </div>
      </div>
    );
};

export default AdminCard;
