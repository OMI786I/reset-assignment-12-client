import { useContext } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaFile, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";

const RecentDonation = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  // useEffect(() => {
  //   setLoading(true);

  //   axios
  //     .get(
  //       `https://b9a12-server-side-omi-786-i.vercel.app/requestDonor?requesterEmail=${user.email}&limit=3`
  //     )
  //     .then((assignment) => {
  //       setData(assignment.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoading(false);
  //     });
  // }, [user.email]);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        `https://b9a12-server-side-omi-786-i.vercel.app/requestDonor?requesterEmail=${user.email}&limit=3`
      ).then((res) => res.json()),
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
        axios
          .delete(
            `https://b9a12-server-side-omi-786-i.vercel.app/requestDonor/${id}`
          )
          .then((res) => {
            console.log(res);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            } else toast.error("There was an error");
          });
      }
    });
  };
  const handleStatus = (id, status) => {
    console.log(id);
    console.log(status);
    const submitData = { donationStatus: status };

    axios
      .patch(
        `https://b9a12-server-side-omi-786-i.vercel.app/requestDonor/${id}`,
        submitData
      )
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

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;
  if (data.length === 0) {
    return (
      <p className="my-3 text-3xl font-bold text-center">
        Add data on create Donation request page
      </p>
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
                    {res.donationStatus === "pending" ||
                    res.donationStatus === "cancel" ? (
                      <td className="text-red-600">{res.donationStatus}</td>
                    ) : (
                      <td className="text-yellow-500">{res.donationStatus}</td>
                    )}

                    {res.donorEmail && res.donorName ? (
                      <td>
                        <span className="font-bold">email:</span>{" "}
                        {res.donorEmail}, <br></br>{" "}
                        <span className="font-bold">name:</span> {res.donorName}
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
                      <Link to={`/dashboard/myDonationEdit/${res._id}`}>
                        <button className="btn btn-neutral">
                          <FaFile />
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-neutral"
                        onClick={() => handleDelete(res._id)}
                      >
                        <FaDeleteLeft />
                        Delete
                      </button>
                    </td>
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
