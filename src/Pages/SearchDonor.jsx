import { useForm } from "react-hook-form";
import useLocationSelector from "../CustomHook/useLocationSelector";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchResult from "../Component/SearchResult";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchDonor = () => {
  const [loading, setLoading] = useState(true);
  const [districtData, setdistrictData] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { districts, filteredUpazillas, filterUpazillas } =
    useLocationSelector();
  const [searchData, setSearchData] = useState();
  const selectedDistrict = watch("districtId");
  useEffect(() => {
    setLoading(true);

    axios
      .get("district.json")
      .then((assignment) => {
        setdistrictData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    filterUpazillas(selectedDistrict);
  }, [selectedDistrict]);

  const onSubmit = (data) => {
    console.log(data);
    const chika = districtData.find((data2) => data2.id === data.districtId);
    const district = chika.name;
    const submitData = { ...data, district };
    console.log(submitData);
    setSearchData(submitData);
    <SearchResult searchData={setSearchData}></SearchResult>;
  };

  return (
    <div className="">
      <h1 className="font-bold text-3xl text-center  gap-5">Search Donor</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:flex items-center gap-5"
      >
        <div className=" form-control">
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <select
            {...register("blood")}
            className="select select-bordered w-full max-w-xs"
          >
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
          {errors.blood && (
            <span className="text-red-600">
              blood group is required is required
            </span>
          )}
        </div>
        <div className="">
          <label className="label">
            <span className="label-text">District</span>
          </label>
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

        <div className="">
          <label className="label">
            <span className="label-text">Upazilla</span>
          </label>
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
        <div className="form-control mt-6 max-w-md">
          <button className="btn btn-neutral">
            <FaSearch />
            Search
          </button>
        </div>
      </form>
      {searchData ? <SearchResult searchData={searchData}></SearchResult> : ""}
    </div>
  );
};

export default SearchDonor;
