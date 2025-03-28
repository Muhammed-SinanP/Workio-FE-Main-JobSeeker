import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeBtn from "./buttons/DarkModeBtn";
import PublicNavOptionsSidebar from "./PublicNavOptionsSidebar";
import UserNavOptionsSidebar from "./user/UserNavOptionsSidebar";

const SideBar = ({ userLoggedIn, sideBarOpen, setSideBarOpen }) => {
  return (
    <div
      id="sideBar"
      className={`duration-400 fixed left-0 top-0 z-10 flex h-screen w-2/3 transform bg-gray-50 transition-transform ease-in-out sm:hidden dark:bg-dark ${
        sideBarOpen
          ? "translate-x-0 shadow-md shadow-black"
          : "-translate-x-full"
      }`}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between bg-gray-300 px-2 py-2.5 text-xl font-medium dark:bg-dark-text">
          <p>Pages</p>
          <CloseIcon
            className="cursor-pointer"
            onClick={() => setSideBarOpen(false)}
          />
        </div>
        <div className="flex h-4/5 flex-col justify-between gap-6 overflow-auto scrollbar-hide">
          <div className="mt-2 flex flex-col gap-2">
            <PublicNavOptionsSidebar setSideBarOpen={setSideBarOpen} />

            {userLoggedIn && (
              <UserNavOptionsSidebar setSideBarOpen={setSideBarOpen} />
            )}
          </div>
          <div className="mb-4 flex justify-center">
            <DarkModeBtn text={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
