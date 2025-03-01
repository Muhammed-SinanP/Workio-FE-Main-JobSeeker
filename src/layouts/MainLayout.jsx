import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { saveUserData, clearUserData } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SignHeader from "../components/header/SignHeader";
import SignFooter from "../components/footer/SignFooter";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ResumeWarningBtn from "../components/buttons/ResumeWarningBtn";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { initialized, userLoggedIn } = useSelector((state) => state.user);
  const {refresh} = useSelector(state => state.refresh)
  const [hasResume, setHasResume] = useState(true);
  const location = useLocation();

  async function checkUser() {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/auth/checkUser",
      });
      if (response.status === 200) {
        dispatch(saveUserData());
      } else {
        dispatch(clearUserData());
      }
    } catch (err) {
      dispatch(clearUserData());
    }
  }

  async function checkResume() {
    try {
      const response = await axiosInstance({
        url: "/user/myProfile",
      });
      if (response.status === 200) {
        const resume = response?.data?.data?.profile?.resume;
        resume ? setHasResume(true) : setHasResume(false);
      }
    } catch (err) {
      setHasResume(false);
    }
  }

  

  useEffect(() => {
    initialized && userLoggedIn && checkResume()
    console.log(initialized,userLoggedIn);
    
    checkUser();
  }, [location.pathname,refresh,userLoggedIn,initialized]);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", theme);
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-brand-extralight dark:bg-dark-light">
      {initialized && userLoggedIn && !hasResume && <ResumeWarningBtn />}
      {location.pathname == "/auth/login" ||
      location.pathname == "/auth/register" ? (
        <SignHeader />
      ) : (
        <Header />
      )}

      <div className="relative flex grow flex-col">
        <Outlet />
      </div>
      {location.pathname == "/auth/login" ||
      location.pathname == "/auth/register" ? (
        <SignFooter />
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default MainLayout;
