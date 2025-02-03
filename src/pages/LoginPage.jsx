import React, { useEffect } from "react";
import AuthForm from "../components/forms/AuthForm";
import { useState } from "react";
import loginImg from "../assets/loginImg.png"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="outerDiv w-full px-4 py-10 sm:p-10  -mt-4 p min-h-screen">

      <div className="innerDiv  flex flex-col sm:flex-row sm:mt-6 sm:gap-10  sm:items-start sm:justify-between sm:px-10 ">
        <div className="">

          <div className="text-center sm:text-start flex flex-col justify-between items-center gap-6 sm:gap-10">
            <div><h1 className="text-brandColor text-4xl font-brandFont mb-2 ">Welcome Back!</h1>
              <p className="text-brandColor-dark  text-sm tracking-wider dark:text-darkColor-text">To explore opportunities with us please login to your existing account with you credentials. If you do not have an existing account, <span className="cursor-pointer text-blue-500 underline font-medium" onClick={() => navigate("/sign/register")}>create</span> a new account.</p>
            </div>
            <div>
              <img src={loginImg} className="h-80 brightness-90 hidden sm:block object-contain" />
            </div>
          </div>
        </div>
        <div className="">
          <AuthForm
            isRegister={false}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
