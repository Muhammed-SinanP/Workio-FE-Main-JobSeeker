import React from "react";
import { NavLink } from "react-router-dom";
import { userNavbarData } from "../Data";

const UserNavOptions = () => {
  return (
    <div className="flex items-center">
      <div className="hidden items-end justify-evenly gap-2 sm:flex">
        {userNavbarData &&
          userNavbarData.map((element, index) => (
            <NavLink
              key={index}
              to={element.path}
              className={({ isActive }) =>
                `flex h-full items-center justify-center border-b-3 border-white pb-1 text-sm font-medium ${
                  isActive
                    ? "border-b-brand text-brand"
                    : "hover:border-b-brand-text dark:border-dark-input dark:text-dark-text dark:hover:border-b-dark-text"
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

export default UserNavOptions;
