import React from "react";
import CallMadeIcon from "@mui/icons-material/CallMade";

const EmployerBtn = () => {
  function openEmployerSite() {
    window.open("https://workioforemployer.netlify.app/");
  }

  return (
    <div
      onClick={openEmployerSite}
      className="cursor-pointer text-sm font-light hover:text-gray-800 dark:text-darkColor-text dark:hover:text-gray-400"
    >
      <span className="hidden sm:block tracking-wide">
        Employers<span className="mx-0.5 text-base font-thin">/</span>Post Job
      </span>
      <span className="flex text-base items-center  tracking-wide sm:hidden">
        Employer
        <span className="ml-0.5 ">?</span>
      </span>
    </div>
  );
};

export default EmployerBtn;
