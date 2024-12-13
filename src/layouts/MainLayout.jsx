import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";

import { axiosInstance } from "../config/axiosInstance";
import { saveUserData,clearUserData } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SignHeader from "../components/Header/SignHeader";
import SignFooter from "../components/footer/SignFooter";
import Footer from "../components/footer/Footer";


const MainLayout = () => {
  const dispatch = useDispatch()
 
  

  
  const location = useLocation()
  async function checkUser() {
    try {
      const response =await axiosInstance({
        method:"GET",
        url:"/user/checkUser/job_seeker"
      })
      if(response.status===200){
         dispatch(saveUserData())
      }
      else{
        dispatch(clearUserData())
      }
    } catch (err) {
      
      // navigate("/")
      dispatch(clearUserData())
    }
    
  }
 
  useEffect(()=>{
    checkUser()
    
  },[location.pathname])
  return (
    <div className="min-h-screen flex flex-col">
      {location.pathname == "/sign/login" ||
      location.pathname == "/sign/register" ? (
        <SignHeader />
      ) : (
        <Header />
      )}

      <div className="flex flex-col grow relative min-h-screen bg-green-50 dark:bg-darkColor-light">
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
