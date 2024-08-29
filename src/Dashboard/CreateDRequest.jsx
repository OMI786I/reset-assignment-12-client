import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import useLocationSelector from "../CustomHook/useLocationSelector";
import toast from "react-hot-toast";

const CreateDRequest = () => {
  const donationStatus = "pending";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [districtData, setdistrictData] = useState();

  useEffect(() => {
    setLoading(true);

    axios
      .get("/district.json")
      .then((assignment) => {
        setdistrictData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const { districts, filteredUpazillas, filterUpazillas } =
    useLocationSelector();
  const selectedDistrict = watch("districtId");
  useEffect(() => {
    filterUpazillas(selectedDistrict);
  }, [selectedDistrict]);
  const onSubmit = (data) => {
    data.districtId;
    const chika = districtData.find((data2) => data2.id === data.districtId);
    const district = chika.name;
    console.log(district);
    const submitData = { ...data, district, donationStatus };
    console.log(submitData);

    axios
      .post("http://localhost:5000/requestDonor", submitData)
      .then((response) => {
        if (response.data.insertedId) {
          toast.success("You have successfully added");
        }
        console.log(response);
      })
      .catch((error) => {
        toast.error("There was an error adding the data");
        console.log(error);
      });
  };
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  console.log(data);

  // Check if the current route path is the dashboard root
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/donor?email=${user.email}`)
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user.email]);

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (data[0].status === "blocked") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-3xl">
          You are blocked and can't create Donation Requests
        </p>
      </div>
    );
  } else
    return (
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-base-200 rounded-lg shadow-md"
        >
          <h1 className="text-3xl text-center">Create Donation Request Page</h1>
          {/* Read-only fields */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Requester Name</span>
            </label>
            <input
              type="text"
              readOnly
              {...register("requesterName")}
              className="input input-bordered w-full"
              value={data[0].name}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Requester Email</span>
            </label>
            <input
              type="email"
              readOnly
              {...register("requesterEmail")}
              className="input input-bordered w-full"
              value={data[0].email}
            />
          </div>

          {/* Editable fields */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Recipient Name</span>
            </label>
            <input
              type="text"
              {...register("recipientName", { required: true })}
              className={`input input-bordered w-full ${
                errors.recipientName ? "input-error" : ""
              }`}
            />
            {errors.recipientName && (
              <p className="text-error mt-2">This field is required</p>
            )}
          </div>

          <div>
            <label htmlFor="districtId">District:</label>
            <select
              id="districtId"
              {...register("districtId", { required: true })}
              className="input input-bordered"
            >
              <option value="">Select district</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.district && (
              <span className="text-red-600">District is required</span>
            )}
          </div>

          <div>
            <label htmlFor="upazilla">Upazilla:</label>
            <select
              id="upazilla"
              {...register("upazilla", { required: true })}
              className="input input-bordered"
              disabled={!selectedDistrict}
            >
              <option value="">Select upazilla</option>
              {filteredUpazillas.map((upazilla) => (
                <option key={upazilla.id} value={upazilla.name}>
                  {upazilla.name}
                </option>
              ))}
            </select>
            {errors.upazilla && (
              <span className="text-red-600">Upazilla is required</span>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Hospital Name</span>
            </label>
            <input
              type="text"
              {...register("hospitalName", { required: true })}
              className={`input input-bordered w-full ${
                errors.hospitalName ? "input-error" : ""
              }`}
            />
            {errors.hospitalName && (
              <p className="text-error mt-2">This field is required</p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Full Address Line</span>
            </label>
            <input
              type="text"
              {...register("fullAddressLine", { required: true })}
              className={`input input-bordered w-full ${
                errors.fullAddressLine ? "input-error" : ""
              }`}
            />
            {errors.fullAddressLine && (
              <p className="text-error mt-2">This field is required</p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Donation Date</span>
            </label>
            <input
              type="date"
              {...register("donationDate", { required: true })}
              className={`input input-bordered w-full ${
                errors.donationDate ? "input-error" : ""
              }`}
            />
            {errors.donationDate && (
              <p className="text-error mt-2">This field is required</p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Donation Time</span>
            </label>
            <input
              type="time"
              {...register("donationTime", { required: true })}
              className={`input input-bordered w-full ${
                errors.donationTime ? "input-error" : ""
              }`}
            />
            {errors.donationTime && (
              <p className="text-error mt-2">This field is required</p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Request Message</span>
            </label>
            <textarea
              {...register("requestMessage", { required: true })}
              className={`textarea textarea-bordered w-full ${
                errors.requestMessage ? "textarea-error" : ""
              }`}
            />
            {errors.requestMessage && (
              <p className="text-error mt-2">This field is required</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Request Donation
          </button>
        </form>
      </div>
    );
};

export default CreateDRequest;
