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
          params:{
            userRole:"job_seeker"
          }
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
      className={`duration-400 fixed left-0 top-0 z-10 flex h-screen w-1/2 transform overflow-auto bg-gray-50 transition-transform ease-in-out sm:hidden sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/6 dark:bg-darkColor ${
        sideBarOpen
          ? "translate-x-0 shadow-md shadow-black"
          : "-translate-x-full"
      }`}
      onClick={() => setSideBarOpen(false)}
    >
      <div className="flex h-full w-full flex-col py-2 pt-0">
        <CloseIcon
          className="absolute right-1 top-1 cursor-pointer text-gray-800 hover:text-gray-700 dark:text-darkColor-text dark:hover:text-gray-400"
          fontSize="small"
        />

        <div className="bg-gray-400 py-1 pl-2 text-lg text-gray-800 dark:bg-darkColor-input dark:text-darkColor-text">
          Pages
        </div>

        <div className="mt-2 flex h-full flex-col gap-2">
          {NavbarData &&
            NavbarData.map((element, index) => (
              <NavLink
                key={index}
                to={element.path}
                className={({ isActive }) =>
                  `px-4 py-1 tracking-wide ${
                    element.title == "Home" ? "font-medium" : "font-normal"
                  } mx-2 flex items-center gap-2 rounded-md ${
                    isActive
                      ? "bg-brandColor-dark text-white dark:bg-brandColor"
                      : "bg-gray-200  hover:bg-gray-300 dark:bg-darkColor-text dark:hover:bg-gray-400"
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
                  `mx-2 flex items-center gap-2 rounded-md px-4 py-1 tracking-wide ${
                    isActive
                      ? "bg-brandColor-dark text-white dark:bg-brandColor"
                      : "bg-gray-200 text-black hover:bg-gray-300 dark:bg-darkColor-text dark:hover:bg-gray-400"
                  }`
                }
              >
                {element.icon} {element.title}
              </NavLink>
            ))}

          <div className="mt-4 flex h-full w-full flex-col justify-end py-4">
            {userLoggedIn && (
              <div className="flex w-full justify-center">
                <button
                  className="flex items-center rounded-md bg-gray-900 px-2 py-1.5 text-white shadow-md hover:bg-gray-700 active:shadow-none dark:bg-darkColor-text dark:text-darkColor-input dark:hover:bg-gray-400"
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
