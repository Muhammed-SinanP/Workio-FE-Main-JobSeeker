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
import PersonIcon from "@mui/icons-material/Person";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

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
      className={`outerDiv sticky top-0 z-20 rounded-b-lg border-b-0.5 border-brandColor-dark bg-white pt-2.5 dark:border-darkColor-text dark:bg-darkColor-input ${
        headShadow
          ? "shadow-sm shadow-brandColor-dark dark:shadow-black border-none"
          : "shadow-none"
      }`}
    >
      <div className="flex items-center justify-between rounded-b-lg bg-white px-2  sm:px-4 dark:bg-darkColor-input">
        <div className="flex items-center gap-2 sm:items-end">
          <div className="sm:hidden">
            <MenuIcon
              onClick={() => setSideBarOpen(true)}
              className="mb-2 cursor-pointer text-gray-900 hover:text-gray-800 dark:text-darkColor-text dark:hover:text-gray-400"
            />
          </div>

          <div className="sm:mb-2 mb-1"><Logo /></div>

          <BasePages />
        </div>

        <div className="flex items-center justify-evenly gap-2">
          {userLoggedIn ? (
            <UserOptions />
          ) : (
            <div className="mb-2 mr-2 hidden gap-2 sm:flex">
              <SignBtn
                action={"login"}
                text={"Login"}
                icon={<PersonIcon fontSize="small" className="p-1" />}
              />
              <SignBtn
                action={"register"}
                text={"Register"}
                icon={<AppRegistrationIcon fontSize="small" className="p-1" />}
              />
            </div>
          )}

          <div className="flex items-center justify-evenly gap-2">
            {!userLoggedIn &&<div className="mb-2 mr-0.5 block sm:hidden">
              <SignBtn
                action={"login"}
                text={"Sign in"}
                icon={<PersonIcon fontSize="small" className="p-1" />}
              />
            </div>}
            <div className="pb-2.5 hidden sm:block">
              <DarkModeBtn />
            </div>

            <div>
              <div className="mb-2.5 h-6 border-r-0.5 border-darkColor-text"></div>
            </div>

            <EmployerBtn />
          </div>
        </div>
      </div>

      <SideBar
        userLoggedIn={userLoggedIn}
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <div
        className={`fixed left-0 top-0 h-screen w-full bg-black bg-opacity-30 transition-opacity duration-500 sm:hidden ${
          sideBarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setSideBarOpen(false)}
      ></div>
    </header>
  );
};

export default Header;
