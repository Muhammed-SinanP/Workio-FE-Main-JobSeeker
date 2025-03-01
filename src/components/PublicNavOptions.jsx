import React from "react";
import { navbarData } from "./Data";
import { NavLink } from "react-router-dom";

const PublicNavOptions = () => {
  return (
    <div className="ml-4 hidden gap-2 sm:flex">
      {navbarData &&
        navbarData.map((element, index) => (
          <NavLink
            key={index}
            to={element.path}
            className={({ isActive }) =>
              `flex justify-center pb-1 text-sm ${
                element.title == "Home" ? "font-bold" : "font-medium"
              } border-b-2 border-white tracking-wide ${
                isActive
                  ? "border-b-brand text-brand"
                  : "hover:border-b-brand-text dark:border-dark-input dark:text-dark-text dark:hover:border-dark-text dark:hover:text-dark-text"
              }`
            }
          >
            {element.title}
          </NavLink>
        ))}
    </div>
  );
};

export default PublicNavOptions;
