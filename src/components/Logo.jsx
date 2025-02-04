import React from "react";
import brandLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex cursor-pointer items-end"
    >
      <img src={brandLogo} alt="brand logo" className="h-8" />
      <div className="-mb-1 hidden sm:block">
        <h1 className="font-brandFont text-2xl text-brandColor">
          <span className="text-3xl">W</span><span className="-ml-1 ">orkio</span>
        </h1>
      </div>
    </div>
  );
};

export default Logo;
