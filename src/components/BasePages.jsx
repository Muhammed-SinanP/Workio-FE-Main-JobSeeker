import React from "react";
import { NavbarData } from "./Data";
import { NavLink } from "react-router-dom";

const BasePages = () => {
  return (
    <div className="hidden sm:flex ml-4 gap-2">
      {NavbarData &&
        NavbarData.map((element, index) => (
          <NavLink
            key={index}
            to={element.path}
            className={({ isActive }) =>
              `flex pb-1 justify-center h-full text-sm ${
                element.title == "Home" ? "font-bold" : "font-medium"
              } border-b-2 border-white tracking-wide  ${
                isActive
                  ? "text-brandColor  border-b-brandColor "
                  : "text-gray-900 dark:text-darkColor-text dark:border-darkColor-input  hover:border-b-gray-900 dark:hover:text-darkColor-text dark:hover:border-darkColor-text"
              }`
            }
          >
            {element.title}
          </NavLink>
        ))}
    </div>
  );
};

export default BasePages;
