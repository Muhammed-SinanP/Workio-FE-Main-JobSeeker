import React from "react";
import { NavbarData } from "./Data";
import { NavLink } from "react-router-dom";

const BasePages = () => {
  return (
    <div className="ml-4 hidden gap-2 sm:flex">
      {NavbarData &&
        NavbarData.map((element, index) => (
          <NavLink
            key={index}
            to={element.path}
            className={({ isActive }) =>
              `flex h-full justify-center pb-1 text-sm ${
                element.title == "Home" ? "font-bold" : "font-medium"
              } border-b-2 border-white tracking-wide ${
                isActive
                  ? "border-b-brandColor text-brandColor"
                  : " hover:border-b-brandColor-text dark:border-darkColor-input dark:text-darkColor-text dark:hover:border-darkColor-text dark:hover:text-darkColor-text"
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
