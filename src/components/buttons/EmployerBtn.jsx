import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";

const EmployerBtn = () => {
  function openEmployerSite() {
    window.open(import.meta.env.VITE_FRONTEND_EMPLOYER);
  }

  return (
    <button
      onClick={openEmployerSite}
      className="cursor-pointer text-sm font-light tracking-wide hover:text-black dark:text-dark-text dark:hover:text-gray-300"
    >
      <span className="hidden sm:flex">
        Employers<span className="mx-0.5 scale-110 font-thin">/</span>Post Job
      </span>
      <span className="flex items-center sm:hidden">
        Employer
        <LaunchIcon fontSize="small" className="p-0.5" />
      </span>
    </button>
  );
};

export default EmployerBtn;
