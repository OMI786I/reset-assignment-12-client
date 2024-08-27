import { useForm } from "react-hook-form";

const CreateDRequest = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
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

        {/**district & upazila */}

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
