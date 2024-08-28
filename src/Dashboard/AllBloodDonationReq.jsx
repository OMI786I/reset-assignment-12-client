import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaFile, FaSearch } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useVolunteer from "../CustomHook/useVolunteer";

const AllBloodDonationReq = () => {
  const { isVolunteer } = useVolunteer();
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:5000/requestDonor").then((res) => res.json()),
  });
  console.log(data);

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
      <h1 className="text-3xl text-center">All Blood Donation Requests</h1>
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
