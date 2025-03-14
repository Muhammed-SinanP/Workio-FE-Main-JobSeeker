import React, { useEffect } from "react";
import AuthForm from "../../components/forms/AuthForm";
import { useNavigate } from "react-router-dom";
const registerImg = "/registerImg.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="outer-div -mt-4 min-h-screen py-4">
      <div className="inner-div flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <div className="">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:gap-10 sm:text-start">
            <div>
              <h1 className="mb-2 font-brand-font text-2xl text-brand sm:text-4xl">
                Welcome To Workio!
              </h1>
              <p className="px-2 font-para-font text-sm tracking-wider text-brand-dark lg:text-base dark:text-dark-text">
                Enter your details and start your journey and explore the
                opportunities with us. If you do have a job seeker's account,
                <span
                  className="mx-1 cursor-pointer font-semibold text-blue-500 underline"
                  onClick={() => navigate("/auth/login")}
                >
                  login
                </span>
                to your existing account instead.
              </p>
            </div>
            <div>
              <img
                src={registerImg}
                className="hidden h-80 object-contain brightness-90 sm:block"
              />
            </div>
          </div>
        </div>
        <div>
          <AuthForm isRegister={true} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
