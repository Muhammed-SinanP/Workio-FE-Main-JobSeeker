import React from "react";
import CallMadeIcon from "@mui/icons-material/CallMade";

const EmployerBtn = () => {
  function openEmployerSite() {
    window.open("https://workioforemployer.netlify.app/");
  }

  return (
    <div
      onClick={openEmployerSite}
      className="mb-2.5 cursor-pointer text-xs font-extralight text-gray-950 hover:text-gray-800 dark:text-darkColor-text dark:hover:text-gray-400"
    >
      <span className="hidden sm:block">
        Employers<span className="mx-0.5">/</span>Post Job
      </span>
      <span className="flex items-center text-sm tracking-wide sm:hidden">
        Employer?
        {/* <CallMadeIcon fontSize="small" className="p-1 pl-0" /> */}
      </span>
    </div>
  );
};

export default EmployerBtn;
