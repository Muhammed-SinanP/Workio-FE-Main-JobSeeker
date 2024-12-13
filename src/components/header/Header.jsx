

import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LoginBtn from "../buttons/LoginBtn";
import RegisterBtn from "../buttons/RegisterBtn";
import { useSelector } from "react-redux";
import { NavbarData } from "../Data";
import SideBar from "../SideBar"
import { NavLink, useNavigate } from "react-router-dom";



import brandLogo from "../../assets/logo.png";
import CallMadeIcon from '@mui/icons-material/CallMade';


import UserOptions from "../User/UserOptions";

import DarkModeBtn from "../buttons/DarkModeBtn";

const Header = () => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [headShadow, setHeadShadow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setHeadShadow(true);
      } else {
        setHeadShadow(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  function navigateToEmployer(){
    window.open("https://workioforemployer.netlify.app/")
  }

  return (
    <div
      className={`outerDiv dark:bg-darkColor sticky top-0 z-20 rounded-b-md border-b-0.5 border-brandColor-dark ${
        headShadow ? "shadow-sm shadow-brandColor-dark" : "shadow-none"
      }`}
    >
      <div className=" bg-white dark:bg-darkColor  flex justify-between sm:items-end items-center px-2 sm:px-4 py-1 pb-0 rounded-b-md">
        <div className=" flex gap-2 sm:items-end items-center">
          <div className="sm:hidden ">
            <MenuIcon
              onClick={() => setSideBarOpen(true)}
              className="cursor-pointer dark:hover:text-darkColor-text dark:text-gray-500 text-gray-800 mb-1 hover:text-gray-950"
            />
          </div>

          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center pt-1 pb-2 "
          >
            <img src={brandLogo} alt="brand logo" className="h-6 sm:h-8" />
            <div>
              <span className="text-xl sm:text-2xl dark:text-darkColor-text font-bold text-brandColor font-brandFont">
                Workio
              </span>
            </div>
          </div>

          <div className="hidden sm:flex ml-4 gap-2">
            {NavbarData &&
              NavbarData.map((element, index) => (
                <NavLink
                  key={index}
                  to={element.path}
                  className={({ isActive }) =>
                    `flex pb-1 justify-center h-full text-sm font-medium border-b-2 border-white  ${
                      isActive
                        ? "text-brandColor  border-b-brandColor "
                        : "text-black dark:text-darkColor-text dark:border-darkColor hover:text-gray-500 hover:border-b-gray-500 dark:hover:text-darkColor-text dark:hover:border-darkColor-text"
                    }`
                  }
                >
                  {element.title}
                </NavLink>
              ))}
          </div>

        </div>

       
        <div className="hidden sm:flex justify-evenly gap-2 items-center ">
          {userLoggedIn ? (
          <div className="flex items-center"><UserOptions/></div> 
          ) : (
            <div className="flex gap-2 mb-2">
              <LoginBtn />
              <RegisterBtn />
            </div>
          )}
          <div className={userLoggedIn?"mt-1":"pb-2"}><DarkModeBtn/></div>
          <div>
            <div className="border-r-0.5 border-black h-6 mb-2.5"></div>
          </div>

          <div
            onClick={navigateToEmployer}
            className="text-gray-700 dark:text-darkColor-text cursor-pointer text-xs font-normal hover:text-gray-900 dark:hover:text-gray-200 mb-2.5"
          >
            Employer/Post Job
          </div>
        </div>
        <div
            onClick={navigateToEmployer}

            className="text-gray-700 dark:text-darkColor-text dark:hover:text-gray-200  sm:hidden cursor-pointer text-xs font-normal hover:text-gray-900 mb-1"
          >
            Employer<CallMadeIcon fontSize="small" className="p-1 pl-0"/>
          </div>

      </div>

      <SideBar userLoggedIn={userLoggedIn} sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>

      <div
        className={`sm:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 transition-opacity duration-500 ${
          sideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSideBarOpen(false)}
      ></div>
    </div>
  );
};

export default Header;
