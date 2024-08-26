import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://i.ibb.co/kKHymG7/Banner.jpg)",
        }}
      >
        <div className="hero-content text-neutral-content text-left">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl md:text-5xl font-bold">
              BE GRATEFUL AND DONATE BLOOD
            </h1>
            <p className="mb-5 md:text-2xl text-red-600">
              Give Blood Save Life
            </p>
            <div className="flex gap-6">
              {" "}
              <Link to={"/registration"}>
                <button className="btn btn-error text-white">
                  Join as a donor
                </button>
              </Link>
              <Link to={"searchPage"}>
                <button className="btn btn-outline text-white">
                  Search donor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
