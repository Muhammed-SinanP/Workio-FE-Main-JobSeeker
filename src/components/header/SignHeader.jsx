import React from "react";
import DarkModeBtn from "../buttons/DarkModeBtn";
import Logo from "../Logo";
import EmployerBtn from "../buttons/EmployerBtn";

const SignHeader = () => {
  return (
    <header
      className={`header`}
    >
      <div className="flex items-end justify-between rounded-b-xl bg-white px-2 pt-3 sm:px-4 dark:bg-dark-input">
        <div className="flex items-end justify-start gap-2">
          <div className="mb-3 ml-1 sm:ml-0">
            <Logo />
          </div>
        </div>

        <div className="flex items-end justify-end gap-2">
          <div className="mb-2.5 ml-2.5 flex items-center gap-2">
            <div className="">
              <DarkModeBtn />
            </div>

            <div>
              <div className="h-8 border-r-0.5 border-dark-text"></div>
            </div>

            <div className="mb-0 sm:mb-0.5">
              <EmployerBtn />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SignHeader;
