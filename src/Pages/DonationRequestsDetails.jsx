import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useDonor from "../CustomHook/useDonor";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
const DonationRequestsDetails = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [donor] = useDonor();
  console.log(donor);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (formData) => {
    console.log(formData);
    const donationStatus = "inprogress";
    const submitData = { ...formData, donationStatus };
    axios
      .patch(`http://localhost:5000/requestDonor/${data._id}`, submitData)
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          navigate("/donationRequests");
          toast.success("Your data is stored");
          console.log(response);
        }
      })
      .catch((error) => {
        toast.error("There was an error updated the data");
        console.log(error);
      });
  };

  if (donor === "L") {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-4 border border-gray-200 mt-10">
        <h2 className="text-3xl font-bold text-center text-primary">Details</h2>

        <div className="badge badge-outline badge-primary mb-4 flex justify-center">
          Status:{" "}
          {data.donationStatus === "pending" ? (
            <span className="text-warning font-semibold">
              {data.donationStatus}
            </span>
          ) : (
            <span className="text-success font-semibold">
              {data.donationStatus}
            </span>
          )}
        </div>

        <div className="card w-full bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-lg font-bold mb-2 text-secondary">
              Requester Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>{data.requesterName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{data.requesterEmail}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card w-full bg-base-100 shadow-md mt-4">
          <div className="card-body">
            <h3 className="card-title text-lg font-bold mb-2 text-secondary">
              Donation Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Recipient Name:</span>
                <span>{data.recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Hospital Name:</span>
                <span>{data.hospitalName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">District:</span>
                <span>{data.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Upazilla:</span>
                <span>{data.upazilla}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Full Address:</span>
                <span>{data.fullAddressLine}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Donation Date:</span>
                <span>{data.donationDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Donation Time:</span>
                <span>{data.donationTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Request Message:</span>
                <span>{data.requestMessage}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-neutral w-full"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Donate
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg space-y-4"
            >
              {/* Donor Name Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Donor Name</span>
                </label>
                <input
                  {...register("donorName", { required: true })}
                  className={`input input-bordered w-full ${
                    errors.donorName ? "input-error" : ""
                  }`}
                  placeholder="Enter donor name..."
                  value={donor.name}
                />
                {errors.donorName && (
                  <span className="text-error mt-1">Name is required</span>
                )}
              </div>

              {/* Donor Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Donor Email</span>
                </label>
                <input
                  {...register("donorEmail", { required: true })}
                  className={`input input-bordered w-full ${
                    errors.donorEmail ? "input-error" : ""
                  }`}
                  placeholder="Enter donor email..."
                  value={donor.email}
                />
                {errors.donorEmail && (
                  <span className="text-error mt-1">Email is required</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <input
                  className="btn btn-neutral w-full"
                  type="submit"
                  value="Donate"
                />
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    );
};

export default DonationRequestsDetails;
