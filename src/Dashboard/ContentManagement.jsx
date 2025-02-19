import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useVolunteer from "../CustomHook/useVolunteer";
import { useState } from "react";

const ContentManagement = () => {
  const { isVolunteer } = useVolunteer();
  const [sortOrder, setSortOrder] = useState("");
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", sortOrder],
    queryFn: () =>
      fetch(
        `https://b9a12-server-side-omi-786-i.vercel.app/blog?status=${sortOrder}`
      ).then((res) => res.json()),
  });
  console.log(data);

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
        axios
          .delete(`https://b9a12-server-side-omi-786-i.vercel.app/blog/${id}`)
          .then((res) => {
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
  const handleUpdate = (id, change) => {
    console.log(id);

    //update operation
    axios
      .patch(`https://b9a12-server-side-omi-786-i.vercel.app/blog/${id}`, {
        status: change,
      })
      .then((response) => {
        refetch();
        if (response.data.modifiedCount > 0) {
          toast.success(`You have successfully made ${change}`);
        }
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

  return (
    <div className="p-2">
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
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </div>

      <h1 className="text-3xl text-center">Blogs Page</h1>
      <div className="flex justify-end">
        <Link to={"/dashboard/blogForm"}>
          {" "}
          <button className="btn btn-neutral">Add Blogs</button>
        </Link>
      </div>

      <div className="grid md:grid-cols-1 gap-4 p-2">
        {data.map((res) => (
          <div
            key={res._id}
            className="card w-[90%] bg-base-100 shadow-2xl rounded-lg overflow-hidden transform "
          >
            <figure className="relative">
              <img
                src={res.image}
                alt="Blog Thumbnail"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-white text-2xl font-semibold">
                  {res.title}
                </h2>
              </div>
            </figure>
            <div className="card-body p-6">
              <p className="text-gray-700 text-base leading-relaxed">
                {res.content}
              </p>
            </div>
            {!isVolunteer ? (
              <div className="flex gap-2 p-2">
                {res.status === "draft" ? (
                  <button
                    className="btn btn-neutral"
                    onClick={() => handleUpdate(res._id, "published")}
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    className="btn btn-neutral"
                    onClick={() => handleUpdate(res._id, "draft")}
                  >
                    Unpublish
                  </button>
                )}
                <button
                  onClick={() => handleDelete(res._id)}
                  className="btn btn-error text-white"
                >
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
