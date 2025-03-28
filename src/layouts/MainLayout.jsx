import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { saveUserData, clearUserData } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SignHeader from "../components/header/SignHeader";
import SignFooter from "../components/footer/SignFooter";
import Footer from "../components/footer/Footer";
import ResumeWarningBtn from "../components/buttons/ResumeWarningBtn";
import Header from "../components/header/Header";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { initialized, userLoggedIn } = useSelector((state) => state.user);
  const { refresh } = useSelector((state) => state.refresh);
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
    checkUser();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    initialized && userLoggedIn && checkResume();
  }, [refresh, userLoggedIn]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return initialized ? (
    <div className="flex min-h-screen flex-col bg-brand-extralight dark:bg-dark-light">
      {userLoggedIn && !hasResume && <ResumeWarningBtn />}
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
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-brand-extralight dark:bg-dark-light">
      <span className="loading loading-bars loading-lg text-brand"></span>
    </div>
  );
};

export default MainLayout;
