import { useForm } from "react-hook-form";

const SearchDonor = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Blood Group</span>
        </label>
        <select
          {...register("blood")}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            Select a blood Group
          </option>
          <option value={"A+"}>A+</option>
          <option value={"A-"}>A-</option>
          <option value={"B+"}>B+</option>
          <option value={"B-"}>B-</option>
          <option value={"O+"}>O+</option>
          <option value={"O-"}>O-</option>
          <option value={"AB+"}>AB+</option>
          <option value={"AB-"}>AB-</option>
        </select>
        {errors.name && <span className="text-red-600">Name is required</span>}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">District</span>
        </label>
        <select
          {...register("district")}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            Select District
          </option>
          <option value={"A+"}>A+</option>
          <option value={"A-"}>A-</option>
          <option value={"B+"}>B+</option>
          <option value={"B-"}>B-</option>
          <option value={"O+"}>O+</option>
          <option value={"O-"}>O-</option>
          <option value={"AB+"}>AB+</option>
          <option value={"AB-"}>AB-</option>
        </select>
        {errors.name && <span className="text-red-600">Name is required</span>}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Upazilla</span>
        </label>
        <select
          {...register("upazilla")}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            Select Upazilla
          </option>
          <option value={"A+"}>A+</option>
          <option value={"A-"}>A-</option>
          <option value={"B+"}>B+</option>
          <option value={"B-"}>B-</option>
          <option value={"O+"}>O+</option>
          <option value={"O-"}>O-</option>
          <option value={"AB+"}>AB+</option>
          <option value={"AB-"}>AB-</option>
        </select>
        {errors.name && <span className="text-red-600">Name is required</span>}
      </div>
      <div className="form-control mt-6 max-w-md">
        <button className="btn btn-neutral">Search</button>
      </div>
    </form>
  );
};

export default SearchDonor;
