import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { saveUserData, clearUserData } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import SignHeader from "../components/header/SignHeader";
import SignFooter from "../components/footer/SignFooter";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const MainLayout = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  async function checkUser() {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/auth/checkUser",
        params: {
          userRole: "job_seeker",
        },
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

  useEffect(() => {
    checkUser();
  }, [location.pathname]);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", theme);
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-brand-extralight dark:bg-dark-light">
      {location.pathname == "/sign/login" ||
      location.pathname == "/sign/register" ? (
        <SignHeader />
      ) : (
        <Header />
      )}

      <div className="relative flex grow flex-col">
        <Outlet />
      </div>
      {location.pathname == "/sign/login" ||
      location.pathname == "/sign/register" ? (
        <SignFooter />
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default MainLayout;
