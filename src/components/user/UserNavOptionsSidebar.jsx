import React from "react";
import { userNavbarData } from "../Data";
import { NavLink } from "react-router-dom";

const UserNavOptionsSidebar = ({ setSideBarOpen }) => {
  return (
    <>
      {userNavbarData &&
        userNavbarData.map((element, index) => (
          <NavLink
            onClick={() => setSideBarOpen(false)}
            key={index}
            to={element.path}
            className={({ isActive }) =>
              `mx-2 flex items-center gap-1.5 rounded-md px-4 py-1.5 text-lg tracking-wide ${
                isActive
                  ? "bg-brand text-white"
                  : "bg-gray-300 hover:bg-gray-300 dark:bg-dark-text dark:hover:bg-gray-400"
              }`
            }
          >
            {element.icon} {element.title}
          </NavLink>
        ))}
    </>
  );
};

export default UserNavOptionsSidebar;
