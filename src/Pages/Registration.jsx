import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLocationSelector from "../CustomHook/useLocationSelector";
import { useContext, useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassWord, setShowPassWord] = useState(false);
  const [showPassWord2, setShowPassWord2] = useState(false);
  const [districtData, setdistrictData] = useState();

  const status = "active";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { createUser } = useContext(AuthContext);
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const { districts, filteredUpazillas, filterUpazillas } =
    useLocationSelector();
  const password = watch("password");
  const selectedDistrict = watch("districtId");

  useEffect(() => {
    filterUpazillas(selectedDistrict);
  }, [selectedDistrict]);

  const onSubmit = (data) => {
    const chika = districtData.find((data2) => data2.id === data.districtId);
    const district = chika.name;
    console.log(district);

    delete data.confirmPassword;

    const submitData = { ...data, status, district };
    console.log(submitData);
    createUser(data.email, data.password)
      .then((result) => {
        navigate(location?.state ? location.state : "/");
        console.log(result);
        axios
          .post("http://localhost:5000/donor", submitData)
          .then((response) => {
            if (response.data.insertedId) {
              toast.success("Your data is added to database");
            }
            console.log(response);
          })
          .catch((error) => {
            toast.error("There was an error adding the data");
            console.log(error);
          });
        toast.success("You have successfully registered");
        updateProfile(result.user, {
          displayName: data.name,
          photoURL: data.image,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("you have registered already");
      });
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left md:w-1/2">
          <img src="../../Resources/registration.jpeg" alt="Registration" />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl md:w-1/2">
          <h1 className="font-bold text-3xl text-center">Registration</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
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
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>

            <div className="form-control">
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
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control">
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
              {errors.blood && (
                <span className="text-red-600">Blood group is required</span>
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="flex items-center">
                <input
                  type={showPassWord ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Password"
                  className="input input-bordered"
                  name="password"
                />
                <span
                  className="hover:cursor-pointer"
                  onClick={() => setShowPassWord(!showPassWord)}
                >
                  {showPassWord ? (
                    <FaRegEye></FaRegEye>
                  ) : (
                    <FaRegEyeSlash></FaRegEyeSlash>
                  )}
                </span>
              </div>

              {errors.password && errors.password.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p className="text-red-600">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one upper case, one lower case, one number,
                  and one special character
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="flex items-center">
                <input
                  type={showPassWord2 ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  name="confirmPassword"
                />
                <span
                  className="hover:cursor-pointer"
                  onClick={() => setShowPassWord2(!showPassWord2)}
                >
                  {showPassWord2 ? (
                    <FaRegEye></FaRegEye>
                  ) : (
                    <FaRegEyeSlash></FaRegEyeSlash>
                  )}
                </span>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="form-control w-full my-6">
              <label>image url</label>
              <input
                {...register("image", { required: true })}
                type="text"
                className=" input input-bordered"
              />
              {errors.image && (
                <p className="text-red-600">image is required</p>
              )}
            </div>

            <div className="form-control mt-6">
              <input
                className="btn btn-neutral"
                type="submit"
                value="Register"
              />
            </div>
          </form>
          <p className="m-4">
            <small>
              Already have an account?{" "}
              <Link className="text-blue-700 underline font-bold" to={"/login"}>
                Log in
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
