import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import { NavbarData, userNavbarData } from "./Data";
import { NavLink, useNavigate } from "react-router-dom";
import brandLogo from "../assets/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useConfirm } from "material-ui-confirm";

import { axiosInstance } from "../config/axiosInstance";

import SignBtn from "./buttons/SignBtn";


const SideBar = ({ userLoggedIn, sideBarOpen, setSideBarOpen }) => {
  const confirm = useConfirm();
  const navigate = useNavigate();
  function handleLogout() {
    async function userLogout() {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/auth/logout",
        });
        if (response.status === 200) {
          navigate("/sign/login");
        }
      } catch (err) {
        console.log("logout err occured", err);
      }
    }

    confirm({
      title: "Logout Confirmation",
      description: "Are you sure you want to do logout?",
      confirmationText: "Confirm",
    })
      .then(() => {
        userLogout();
      })
      .catch(() => {
        console.log("logout cancelled");
      });
  }
  return (
    <div
      id="sideBar"
      className={`fixed sm:hidden overflow-auto flex w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/6  bg-gray-50 dark:bg-darkColor  z-10 left-0 top-0 h-screen transform transition-transform duration-400 ease-in-out ${
        sideBarOpen
          ? "translate-x-0 shadow-md shadow-black"
          : "-translate-x-full"
      }`}
      onClick={() => setSideBarOpen(false)}
    >
      <div className="h-full w-full flex flex-col  py-2">
        <CloseIcon
          className="absolute right-1 top-1 hover:text-gray-700 dark:text-darkColor-text cursor-pointer text-gray-800 dark:hover:text-gray-400 p-0.5"
          fontSize="small"
        />
        {userLoggedIn ? (
          <div className="flex items-start gap-3 justify-start px-2 border-b dark:border-darkColor-text">
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer flex pb-1 "
            >
              <img src={brandLogo} alt="brand logo" className="h-6" />
              <div>
                <span className="text-xl font-bold text-brandColor font-brandFont">
                  Workio
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-start px-2 sm:justify-center gap-2 py-2 sm:hidden border-b dark:border-darkColor-text">
            <SignBtn login={true} />
            <SignBtn login={false} />
          </div>
        )}
        
        <div className=" flex flex-col gap-1 mt-2 h-full">
          {NavbarData &&
            NavbarData.map((element, index) => (
              <NavLink
                key={index}
                to={element.path}
                className={({ isActive }) =>
                  ` px-4 py-1 tracking-wide ${
                    element.title == "Home" ? "font-medium" : "font-normal"
                  } mx-2 rounded-md flex items-center gap-2 ${
                    isActive
                      ? "bg-brandColor-dark dark:bg-brandColor text-white"
                      : "bg-gray-200 dark:bg-darkColor-text text-black hover:bg-gray-300 dark:hover:bg-gray-400"
                  }`
                }
              >
                {element.icon} {element.title}
              </NavLink>
            ))}

            

          {userLoggedIn &&
            userNavbarData &&
            userNavbarData.map((element, index) => (
              <NavLink
                key={index}
                to={element.path}
                className={({ isActive }) =>
                  ` px-4 py-1 tracking-wide mx-2 rounded-md flex gap-2 items-center  ${
                    isActive
                      ? "bg-brandColor-dark dark:bg-brandColor text-white"
                      : "bg-gray-200 dark:bg-darkColor-text text-black hover:bg-gray-300 dark:hover:bg-gray-400"
                  }`
                }
              >
                {element.icon} {element.title}
              </NavLink>
            ))}

          <div className=" h-full w-full  flex flex-col justify-end py-4 mt-4">
            {userLoggedIn && (
              <div className=" flex justify-center w-full">
                <button
                  className="px-2 py-1.5 rounded-md  flex items-center  bg-gray-900 shadow-md hover:bg-gray-700 text-white dark:bg-darkColor-text dark:text-darkColor-input dark:hover:bg-gray-400 active:shadow-none"
                  onClick={handleLogout}
                >
                  <LogoutIcon fontSize="small" className="p-1" />
                  <span className="text-xs">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
