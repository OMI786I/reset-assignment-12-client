import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      navigate(location?.state ? location.state : "/");
      console.log(user);
      console.log(user);
      Swal.fire({
        title: "Successfully logged In!",
        text: "You clicked the button!",
        icon: "success",
      });
    });
  };

  const handleValidateCapthca = (e) => {
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div>
      {" "}
      <div className="hero bg-base-200 min-h-screen  ">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left md:w-1/2">
            <img
              className="w-[80%]"
              src="https://i.ibb.co/YpqHyp4/vecteezy-male-volunteers-donate-blood-donate-blood-world-blood-5639060.jpg"
            ></img>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl md:w-1/2">
            <h1 className="font-bold text-3xl text-center">Login</h1>
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate></LoadCanvasTemplate>
                </label>
                <input
                  onBlur={handleValidateCapthca}
                  type="text"
                  placeholder="type the text above"
                  className="input input-bordered"
                  name="captcha"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={disabled}>
                  Login
                </button>
              </div>
            </form>
            <p className="p-3">
              <small>
                New Here?{" "}
                <Link
                  to={"/registration"}
                  className="underline text-blue-600 font-bold"
                >
                  Create an account
                </Link>
              </small>
            </p>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
