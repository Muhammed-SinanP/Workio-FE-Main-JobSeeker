import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import SideBar from "../SideBar";
import UserOptions from "../user/UserOptions";
import DarkModeBtn from "../buttons/DarkModeBtn";
import SignBtn from "../buttons/SignBtn";
import Logo from "../Logo";
import BasePages from "../BasePages";
import EmployerBtn from "../buttons/EmployerBtn";

const Header = () => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [headShadow, setHeadShadow] = useState(false);

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

  return (
    <header
      className={`outerDiv sm:pt-0.5 bg-white dark:bg-darkColor-input sticky top-0 z-20 rounded-b-md border-b-0.5 border-brandColor-dark dark:border-darkColor ${
        headShadow
          ? "shadow-sm shadow-brandColor-dark dark:shadow-darkColor-input"
          : "shadow-none"
      }`}
    >
      <div className=" bg-white dark:bg-darkColor-input  flex justify-between items-end px-2 sm:px-4 py-1 pb-0 rounded-b-md">
        <div className=" flex gap-2 sm:items-end items-center">
          <div className="sm:hidden ">
            <MenuIcon
              onClick={() => setSideBarOpen(true)}
              className="cursor-pointer dark:text-darkColor-text dark:hover:text-gray-400 text-gray-900 mb-1 hover:text-gray-800"
            />
          </div>

          <Logo />

          <BasePages />
        </div>

        <div className="flex justify-evenly gap-2 items-center ">
          {userLoggedIn ? (
            <UserOptions />
          ) : (
            <div className="hidden sm:flex gap-2 mb-2">
              <SignBtn login={true} />
              <SignBtn login={false} />
            </div>
          )}

          <div className="pb-2">
            <DarkModeBtn />
          </div>

          <div>
            <div className="border-r-0.5 border-gray-600 h-6 mb-2.5"></div>
          </div>

          <EmployerBtn />
        </div>
      </div>

      <SideBar
        userLoggedIn={userLoggedIn}
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <div
        className={`sm:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 transition-opacity duration-500 ${
          sideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSideBarOpen(false)}
      ></div>
    </header>
  );
};

export default Header;
