import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import { NavbarData, userNavbarData } from "./Data";
import { NavLink, useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import { useConfirm } from "material-ui-confirm";

import { axiosInstance } from "../config/axiosInstance";
import DarkModeBtn from "./buttons/DarkModeBtn";


const SideBar = ({ userLoggedIn, sideBarOpen, setSideBarOpen }) => {
  
  const confirm = useConfirm();
  const navigate = useNavigate();
  function handleLogout() {
    async function userLogout() {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/auth/logout",
          params: {
            userRole: "job_seeker"
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
      className={`duration-400 fixed left-0 top-0 z-10 flex h-screen w-2/3 transform  bg-gray-50 transition-transform ease-in-out sm:hidden dark:bg-darkColor ${sideBarOpen
        ? "translate-x-0 shadow-md shadow-black"
        : "-translate-x-full"
        }`}
      
    >
      <div className="flex h-full w-full flex-col ">
        <div className="bg-gray-300 flex justify-between items-center  py-2 px-2 text-xl  dark:bg-darkColor-input dark:text-darkColor-text">
          <p>Pages</p> <CloseIcon className="cursor-pointer" onClick={()=>setSideBarOpen(false)}/>
        </div>
        <div className=" h-full flex flex-col justify-between gap-6 overflow-auto scrollbar-hide">

          <div className="mt-2 flex flex-col gap-2">
            {NavbarData &&
              NavbarData.map((element, index) => (
                <NavLink
                  onClick={()=>setSideBarOpen(false)}
                  key={index}
                  to={element.path}
                  className={({ isActive }) =>
                    `px-4 py-1 tracking-wide text-lg ${element.title == "Home" ? "font-medium" : "font-normal"
                    } mx-2 flex items-center gap-2 rounded-md ${isActive
                      ? "bg-brandColor-dark text-white dark:bg-brandColor"
                      : "bg-gray-300  hover:bg-gray-300 dark:bg-darkColor-text dark:hover:bg-gray-400"
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
                  onClick={() => setSideBarOpen(false)}
                  key={index}
                  to={element.path}
                  className={({ isActive }) =>
                    `mx-2 flex items-center gap-2 rounded-md px-4 py-1 text-lg  font-normal tracking-wide ${isActive
                      ? "bg-brandColor-dark text-white dark:bg-brandColor"
                      : "bg-gray-300  hover:bg-gray-300 dark:bg-darkColor-text dark:hover:bg-gray-400"
                    }`
                  }
                >
                  {element.icon} {element.title}
                </NavLink>
              ))}


          </div>
          <div className="flex flex-col items-center mb-10 gap-10">
            <DarkModeBtn text={true}/>
            {userLoggedIn && <button onClick={handleLogout} className="btn  btn-sm"><LogoutIcon fontSize="small" />Logout</button>
            }</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
