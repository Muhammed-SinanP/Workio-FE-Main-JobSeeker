import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import SideBar from "../SideBar";
import DarkModeBtn from "../buttons/DarkModeBtn";
import Logo from "../Logo";
import EmployerBtn from "../buttons/EmployerBtn";
import PublicNavOptions from "../PublicNavOptions";
import UserNavOptions from "../user/UserNavOptions";
import LoginBtn from "../buttons/LoginBtn";
import RegisterBtn from "../buttons/RegisterBtn";
import SignInBtn from "../buttons/SignInBtn";

const Header = () => {
  const { userLoggedIn } = useSelector((state) => state.user);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [headShadow, setHeadShadow] = useState(false);

  useEffect(() => {
    if (sideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sideBarOpen]);

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
      className={`header sticky top-0 z-20 ${
        headShadow
          ? "border-none shadow-sm shadow-brand-dark dark:shadow-black"
          : "shadow-none"
      }`}
    >
      <div className="flex items-end justify-between rounded-b-xl bg-white px-2 pt-3 sm:px-4 dark:bg-dark-input">
        <div className="flex items-end justify-start gap-2">
          <div className="mb-2.5 scale-125 sm:hidden">
            <MenuIcon
              onClick={() => setSideBarOpen(true)}
              className="mb-1.5 cursor-pointer text-gray-900 hover:text-gray-800 dark:text-dark-text dark:hover:text-gray-400"
            />
          </div>

          <div className="mb-3">
            <Logo />
          </div>

          <div className="ml-2">
            {" "}
            <PublicNavOptions />
          </div>
        </div>

        <div className="flex items-end justify-end gap-2">
          {userLoggedIn ? (
            <UserNavOptions />
          ) : (
            <div className="mb-3 flex gap-2">
              <div className="sm:hidden">
                <SignInBtn />
              </div>
              <div className="hidden sm:block">
                <LoginBtn />
              </div>
              <div className="hidden sm:block">
                <RegisterBtn />
              </div>
            </div>
          )}

          <div className="mb-2.5 ml-0 flex items-center gap-2 sm:ml-2.5">
            <div className="hidden sm:block">
              <DarkModeBtn />
            </div>

            <div>
              <div className="h-8 border-r-0.5 border-dark-text"></div>
            </div>

            <div className="mb-0 sm:mb-0.5">
              <EmployerBtn />
            </div>
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
          sideBarOpen ? "visible" : "invisible"
        }`}
        onClick={() => setSideBarOpen(false)}
      ></div>
    </header>
  );
};

export default Header;
