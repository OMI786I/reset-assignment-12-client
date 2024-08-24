import React from "react";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://i.ibb.co/hgfVpMp/Banner.webp)",
        }}
      >
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
