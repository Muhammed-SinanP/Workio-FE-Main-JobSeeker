import React from "react";
import { NavLink } from "react-router-dom";
import { userNavbarData } from "../Data";
import LogoutIcon from "@mui/icons-material/Logout";
import { useConfirm } from "material-ui-confirm";
import { axiosInstance } from "../../config/axiosInstance";

const UserOptions = () => {
  
  
  return (
    <div className=" flex items-center">
      <div className="mt-2 hidden items-end justify-evenly gap-2 sm:flex">
        {userNavbarData &&
          userNavbarData.map((element, index) => (
            <NavLink
              key={index}
              to={element.path}
              className={({ isActive }) =>
                `flex h-full items-center justify-center border-b-2 border-white pb-1 text-sm font-medium ${
                  isActive
                    ? "border-b-brandColor text-brandColor"
                    : " hover:border-b-brandColor-text dark:border-darkColor-input dark:text-darkColor-text dark:hover:border-b-darkColor-text"
                }`
              }
            >
              <div title={element.title}>{element.icon}</div>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default UserOptions;
