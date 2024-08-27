import { useEffect, useState } from "react";
import useLocationSelector from "../../CustomHook/useLocationSelector";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";

const UpdateProfile = () => {
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
  useEffect(() => {
    filterUpazillas(selectedDistrict);
  }, [selectedDistrict]);

  const onSubmit = (data) => {
    const chika = districtData.find((data2) => data2.id === data.districtId);
    const district = chika.name;
    const submitData = { ...data, district };
    console.log(submitData);
    setSearchData(submitData);
  };

  return (
    <div className=" flex justify-center bg-gray-200">
      <div className=" bg-base-100 w-full shadow-2xl md:w-1/2">
        <h1 className="font-bold text-3xl text-center p-3">Update Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="flex gap-2">
            <div className="">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input input-bordered"
                name="name"
              />
            </div>

            <div className="">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input input-bordered"
                name="email"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                {...register("blood", { required: true })}
                className="select select-bordered w-full max-w-xs"
              >
                <option value="">Select a blood Group</option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B+"}>B+</option>
                <option value={"B-"}>B-</option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
              </select>
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
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {" "}
            <div className=" w-full ">
              <div className="label">
                <label className="label-text">image url</label>
              </div>

              <input
                {...register("image", { required: true })}
                type="text"
                className=" input input-bordered"
              />
            </div>
            <div className=" mt-6">
              <input className="btn btn-neutral" type="submit" value="Update" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
