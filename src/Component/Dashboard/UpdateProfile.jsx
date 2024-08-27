import { useEffect, useState } from "react";
import useLocationSelector from "../../CustomHook/useLocationSelector";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateProfile = ({ data, onUpdate, isDisable, setIsDisable }) => {
  const [{ name, blood, district, upazilla, image, _id }] = data;
  console.log(data);
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
    axios
      .put(`http://localhost:5000/donor/${_id}`, submitData)
      .then((response) => {
        setLoading(false);
        if (response.data.modifiedCount > 0) {
          toast.success("You have successfully updated");
          console.log(response);
          onUpdate();
          setIsDisable(true);
        }
      })
      .catch((error) => {
        toast.error("There was an error updated the data");
        console.log(error);
      });
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div className=" card flex justify-center bg-gray-200">
        <div className=" bg-base-100 w-full shadow-2xl md:w-1/2">
          <h1 className="font-bold text-3xl text-center p-3">Update Profile</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className=" gap-2">
              <div className="">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Name"
                  className="input input-bordered"
                  name="name"
                  defaultValue={name}
                  disabled={isDisable}
                />
              </div>
            </div>
            <div className=" gap-2 items-center">
              <div className="">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select
                  {...register("blood")}
                  className="select select-bordered w-full max-w-xs"
                  disabled={isDisable}
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
                  {...register("districtId")}
                  className="input input-bordered"
                  disabled={isDisable}
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
                  {...register("upazilla")}
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
            <div className=" gap-2 items-center">
              {" "}
              <div className=" w-full ">
                <div className="label">
                  <label className="label-text">image url</label>
                </div>

                <input
                  {...register("image")}
                  type="text"
                  className=" input input-bordered"
                  defaultValue={image}
                  disabled={isDisable}
                />
              </div>
              <div className=" mt-6">
                <input
                  className="btn btn-neutral"
                  type="submit"
                  value="Update"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
};

export default UpdateProfile;
