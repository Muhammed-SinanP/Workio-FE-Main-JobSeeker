import React from "react";
import brandLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

import DarkModeBtn from "../buttons/DarkModeBtn";
import Logo from "../Logo";
import EmployerBtn from "../buttons/EmployerBtn";

const SignHeader = () => {
  return (
    <header className="outerDiv z-20 rounded-b-lg border-b-0.5 border-brandColor-dark bg-white pt-2.5 dark:border-darkColor-text dark:bg-darkColor-input">
      <div className="flex items-center justify-between rounded-b-lg bg-white px-2  sm:px-4 dark:bg-darkColor-input">
        <div className="sm:mb-2 mb-1"><Logo /></div>

        <div className=" flex items-center justify-evenly gap-2">
          <div className="pb-2.5">
            <DarkModeBtn />
          </div>

          <div>
            <div className="mb-2.5 h-6 border-r-0.5 border-borderColor"></div>
          </div>

          <EmployerBtn />
        </div>
      </div>
    </header>
  );
};

export default SignHeader;
