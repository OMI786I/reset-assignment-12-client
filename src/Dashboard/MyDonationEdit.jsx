import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useLocationSelector from "../CustomHook/useLocationSelector";
import axios from "axios";
import toast from "react-hot-toast";

const MyDonationEdit = () => {
  const getData = useLoaderData();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    const submitData = { ...data, district };
    axios
      .put(`http://localhost:5000/requestDonor/${getData._id}`, submitData)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.data.modifiedCount > 0) {
          toast.success("You have successfully updated");
          console.log(response);
          navigate("/dashboard/my-donation-request");
        }
      })
      .catch((error) => {
        toast.error("There was an error updated the data");
        console.log(error);
      });
  };
  return (
    <div>
      <h1 className="text-3xl text-center p-2"></h1>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-base-200 rounded-lg shadow-md"
        >
          <h1 className="text-3xl text-center">Edit Donation Request Page</h1>

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
              defaultValue={getData.recipientName}
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
              defaultValue={getData.hospitalName}
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
              defaultValue={getData.fullAddressLine}
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
              defaultValue={getData.donationTime}
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
              defaultValue={getData.requestMessage}
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
    </div>
  );
};

export default MyDonationEdit;
