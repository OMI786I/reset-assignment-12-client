import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useLocationSelector from "../CustomHook/useLocationSelector";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Registration = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [showPassWord2, setShowPassWord2] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { loading, districts, filteredUpazillas, filterUpazillas } =
    useLocationSelector();
  const password = watch("password");
  const selectedDistrict = watch("district");

  useEffect(() => {
    filterUpazillas(selectedDistrict);
  }, [selectedDistrict]);

  const onSubmit = (data) => {
    console.log(data);
    delete data.confirmPassword;
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left md:w-1/2">
          <img src="../../Resources/registration.jpeg" alt="Registration" />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl md:w-1/2">
          <h1 className="font-bold text-3xl text-center">Signup</h1>
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
              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>

            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
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
