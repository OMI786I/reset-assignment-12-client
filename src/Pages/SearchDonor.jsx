import { useForm } from "react-hook-form";
import useLocationSelector from "../CustomHook/useLocationSelector";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchResult from "./SearchResult";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";

const SearchDonor = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { loading, districts, filteredUpazillas, filterUpazillas } =
    useLocationSelector();
  const selectedDistrict = watch("district");
  useEffect(() => {
    filterUpazillas(selectedDistrict);
  }, [selectedDistrict]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="hero-content">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl md:w-1/2"
      >
        <h1 className="font-bold text-3xl text-center  gap-5">Search Donor</h1>
        <div className="form-control ">
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
            {/**    //B%2B */}
            <option value={"A%2B"}>A+</option>
            <option value={"A-"}>A-</option>
            <option value={"B%2B"}>B+</option>
            <option value={"B-"}>B-</option>
            <option value={"O%2B"}>O+</option>
            <option value={"O-"}>O-</option>
            <option value={"AB%2b"}>AB+</option>
            <option value={"AB-"}>AB-</option>
          </select>
          {errors.name && (
            <span className="text-red-600">Name is required</span>
          )}
        </div>
        <div>
          <label htmlFor="district">District:</label>
          <select
            id="district"
            {...register("district", { required: true })}
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
              <option key={upazilla.id} value={upazilla.id}>
                {upazilla.name}
              </option>
            ))}
          </select>
          {errors.upazilla && (
            <span className="text-red-600">Upazilla is required</span>
          )}
        </div>
        <div className="form-control mt-6 max-w-md">
          <Link to={"/result"} state={{ data: watch() }}>
            <button className="btn btn-neutral">
              <FaSearch />
              Search
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SearchDonor;
