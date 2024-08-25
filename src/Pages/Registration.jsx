import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useLocationSelector from "../CustomHook/useLocationSelector";
import { useEffect } from "react";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Used to watch changes in the form values
  } = useForm();

  const { loading, districts, filteredUpazillas, filterUpazillas } =
    useLocationSelector();

  // Watch the selected district to filter upazillas dynamically
  const selectedDistrict = watch("district");

  // Use useEffect to filter upazillas when selectedDistrict changes
  useEffect(() => {
    filterUpazillas(selectedDistrict);
  }, [selectedDistrict]); // Only re-run the effect if selectedDistrict changes

  const onSubmit = (data) => {
    console.log(data);
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

            <div>
              <label htmlFor="district">District:</label>
              <select
                id="district"
                {...register("district", { required: true })}
                className="input input-bordered"
                required
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
                required
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
              <input
                type="password"
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
          <p>
            <small>
              Already have an account?{" "}
              <Link className="text-blue-700 underline" to={"/login"}>
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
