import React from "react";
import CallMadeIcon from "@mui/icons-material/CallMade";

const EmployerBtn = () => {
  function openEmployerSite() {
    window.open("https://workioforemployer.netlify.app/");
  }

  return (
    <div
      onClick={openEmployerSite}
      className="text-gray-900 hover:text-gray-700 tracking-wide dark:text-darkColor-text cursor-pointer text-xs font-light  dark:hover:text-gray-400 mb-2.5"
    >
      <span className="hidden sm:block">Employer/Post Job</span>
      <span className="flex items-center sm:hidden">
        Employer
        <CallMadeIcon fontSize="small" className="p-1 pl-0 " />
      </span>
    </div>
  );
};

export default EmployerBtn;
