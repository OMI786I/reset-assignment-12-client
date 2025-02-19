import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../CustomHook/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donor");
      return res.data;
    },
  });
  console.log(data);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  const handleStatus = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Make  ${status}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://b9a12-server-side-omi-786-i.vercel.app/donor/admin/${id}`,
            { status: status }
          )
          .then((res) => {
            console.log(res);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: `Made ${status}!`,
                text: `User is Successfully made ${status}.`,
                icon: "success",
              });
            } else toast.error("There was an error");
          });
      }
    });
  };

  const handleRole = (id, roleName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://b9a12-server-side-omi-786-i.vercel.app/donor/admin/${id}`,
            { role: roleName }
          )
          .then((res) => {
            console.log(res);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: `Made ${roleName}!`,
                text: `User is Successfully made ${roleName}.`,
                icon: "success",
              });
            } else toast.error("There was an error");
          });
      }
    });
  };

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
                <th>User Avatar</th>
                <th>User Email</th>
                <th>User Name</th>
                <th>User Role</th>
                <th>User status</th>
                <th>{/**block/unblock button */}</th>
                <th>{/**make volunteer */}</th>
                <th>{/**make admin */}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.map((res, index) => (
                <tr key={res._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={res.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {res.email}
                    <br />
                  </td>
                  <td>{res.name}</td>
                  <th>{res.role ? res.role : "donor"}</th>
                  <th>{res.status}</th>
                  <th>
                    {res.status === "active" ? (
                      <button
                        className="btn btn-neutral mx-3"
                        onClick={() => handleStatus(res._id, "blocked")}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="btn btn-neutral mx-3"
                        onClick={() => handleStatus(res._id, "active")}
                      >
                        Unblock
                      </button>
                    )}
                  </th>
                  <th>
                    {res.role === "volunteer" ? (
                      <button
                        onClick={() => handleRole(res._id, "")}
                        className="btn btn-neutral mx-3"
                      >
                        Un Volunteer
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRole(res._id, "volunteer")}
                        className="btn btn-neutral mx-3"
                      >
                        Make volunteer
                      </button>
                    )}
                  </th>
                  <th>
                    {res.role === "admin" ? (
                      <button
                        onClick={() => handleRole(res._id, "")}
                        className="btn btn-neutral mx-3"
                      >
                        Un admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRole(res._id, "admin")}
                        className="btn btn-neutral mx-3"
                      >
                        Make Admin
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
