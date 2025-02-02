import React from "react";
import brandLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="mb-2 mt-1 flex cursor-pointer items-center"
    >
      <img src={brandLogo} alt="brand logo" className="h-6 sm:h-7" />
      <div>
        <span className="font-brandFont text-xl font-bold text-brandColor sm:text-xl">
          Workio
        </span>
      </div>
    </div>
  );
};

export default Logo;
