import React, { useEffect } from "react";
import AuthForm from "../components/forms/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerImg from "../assets/registerImg.png"

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="outerDiv w-full px-4 py-10 sm:p-10  -mt-4 p min-h-screen">

      <div className="innerDiv p-1  flex flex-col sm:flex-row sm:mt-6 gap-2 sm:gap-10 sm:items-start sm:justify-between px-0 sm:px-10 ">
        <div className="">

          <div className="text-center sm:text-start flex flex-col justify-between items-center gap-10">
            <div><h1 className="text-brandColor text-2xl sm:text-4xl font-brandFont mb-2 ">Welcome to Workio!</h1>
              <p className="text-brandColor-dark  text-sm lg:text-base tracking-wider dark:text-darkColor-text">Enter your details and start your journey and explore the opportunities with us. If you do have a job seeker's account, <span className="cursor-pointer text-blue-500 underline font-medium" onClick={() => navigate("/sign/login")}>login</span> to your existing account instead.</p>
            </div> 
            <div>
            <img src={registerImg} className="h-80 brightness-90 hidden sm:block object-contain" />
            </div>
          </div>
        </div>
        <div>
        <AuthForm
          isRegister={true}
          formData={formData}
          setFormData={setFormData}
        />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
