import React from "react";
import brandLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="cursor-pointer flex items-center mt-1 mb-2 "
    >
      <img src={brandLogo} alt="brand logo" className="h-6 sm:h-7" />
      <div>
        <span className="text-xl sm:text-xl  font-bold text-brandColor font-brandFont">
          Workio
        </span>
      </div>
    </div>
  );
};

export default Logo;
