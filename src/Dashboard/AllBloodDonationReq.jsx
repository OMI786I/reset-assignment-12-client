import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaFile, FaSearch } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useVolunteer from "../CustomHook/useVolunteer";
import { useState } from "react";

const AllBloodDonationReq = () => {
  const { isVolunteer } = useVolunteer();

  const [sortOrder, setSortOrder] = useState("");

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", sortOrder],
    queryFn: () =>
      fetch(
        `http://localhost:5000/requestDonor?donationStatus=${sortOrder}`
      ).then((res) => res.json()),
  });
  console.log(data);

  const handleStatus = (id, status) => {
    console.log(id);
    console.log(status);
    const submitData = { donationStatus: status };

    axios
      .patch(`http://localhost:5000/requestDonor/${id}`, submitData)
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          refetch();
          toast.success("Your data is updated");
          console.log(response);
        } else toast.error("already requested");
      })
      .catch((error) => {
        toast.error("There was an error updated the data");
        console.log(error);
      });
  };

  const handleSort = (order) => {
    setSortOrder(order);
    console.log(order);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/requestDonor/${id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          } else toast.error("There was an error");
        });
      }
    });
  };

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <div className="text-center my-4">
        <label htmlFor="sortOrder" className="font-bold mr-2">
          FIlter by Status:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All</option>
          <option value="pending">pending</option>
          <option value="inprogress">inprogress</option>
          <option value="done">done</option>
          <option value="cancel">cancel</option>
        </select>
      </div>

      <h1 className="text-3xl text-center">All Blood Donation Requests</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Requester Email</th>
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
                  <td>{res.requesterEmail}</td>
                  <td>{res.recipientName}</td>
                  <td>
                    {res.district} , {res.upazilla}
                  </td>
                  <td>{res.donationDate}</td>
                  <td>{res.donationTime}</td>
                  <td>{res.donationStatus}</td>
                  {res.donationStatus === "pending" ||
                  res.donationStatus === "cancel" ? (
                    <td className="text-red-600">{res.donationStatus}</td>
                  ) : (
                    <td className="text-yellow-500">{res.donationStatus}</td>
                  )}

                  {res.donorEmail && res.donorName ? (
                    <td>
                      <span className="font-bold">email:</span> {res.donorEmail}
                      , <br></br> <span className="font-bold">name:</span>{" "}
                      {res.donorName}
                      {res.donationStatus === "inprogress" ? (
                        <div className="flex gap-2">
                          <button
                            className="btn btn-success btn-xs"
                            onClick={() => handleStatus(res._id, "done")}
                          >
                            Done
                          </button>
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => handleStatus(res._id, "cancel")}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  ) : (
                    <td>No Donor</td>
                  )}

                  <td>
                    <Link to={`/dashboard/adminDonationEdit/${res._id}`}>
                      <button className="btn btn-neutral">
                        <FaFile />
                        Edit
                      </button>
                    </Link>
                  </td>
                  {!isVolunteer ? (
                    <td>
                      <button
                        className="btn btn-neutral"
                        onClick={() => handleDelete(res._id)}
                      >
                        <FaDeleteLeft />
                        Delete
                      </button>
                    </td>
                  ) : (
                    ""
                  )}

                  <td>
                    <Link to={`/dashboard/myDonationDetails/${res._id}`}>
                      <button className="btn btn-neutral">
                        <FaSearch />
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBloodDonationReq;
