import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FundForm = () => {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const date = new Date(year, month - 1, day);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`http://localhost:5000/donor?email=${user.email}`).then((res) =>
        res.json()
      ),
  });

  console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data2) => {
    let donation = parseInt(data2.donation);
    const submitData = { ...data2, donation, date };
    console.log(submitData);
    axios
      .patch(`http://localhost:5000/donor/${data[0]._id}`, submitData)
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          toast.success("You have successfully updated");
          console.log(response);
          navigate("/fund");
        }
      })
      .catch((error) => {
        toast.error("There was an error updated the data");
        console.log(error);
      });
  };
  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <div className="max-w-lg mx-auto p-8 bg-base-200 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Make a Donation</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            readOnly
            {...register("email")}
            className="input input-bordered w-full"
            value={user.email}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Donation Amount</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            {...register("donation", {
              required: "Donation Amount is required",
              min: { value: 1, message: "Minimum donation is $1" },
            })}
          />
          {errors.amount && (
            <span className="text-red-500">{errors.amount.message}</span>
          )}
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Message (Optional)</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            {...register("message")}
          />
        </div>

        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">
            Donate Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default FundForm;
