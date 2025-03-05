import React from "react";
const brandLogo = "/logo.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex scale-95 cursor-pointer items-end"
    >
      <img src={brandLogo} alt="brand logo" className="h-8" />
      <div className="-mb-1 hidden sm:block">
        <h1 className="font-brand-font text-2xl text-brand">
          <span className="text-3xl">W</span>
          <span className="-ml-1">orkio</span>
        </h1>
      </div>
    </div>
  );
};

export default Logo;
