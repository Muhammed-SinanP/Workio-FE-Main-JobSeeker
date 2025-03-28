import React from "react";
import AuthForm from "../../components/forms/AuthForm";
import { useNavigate } from "react-router-dom";
const loginImg = "/loginImg.png";

const LoginPage = () => {
  const navigate = useNavigate()
  return (
    <div className="page-div">
      <div className="inner-div flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <div className="">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:gap-10 sm:text-start">
            <div>
              <h1 className="mb-2 font-brand-font text-2xl text-brand sm:text-4xl">
                Welcome Back!
              </h1>
              <p className="px-2 font-para-font text-sm tracking-wider text-brand-dark sm:px-0 lg:text-base dark:text-dark-text">
                To explore opportunities with us please login to your existing
                account with you credentials. If you do not have an existing
                account,
                <span
                  className="mx-1 cursor-pointer font-semibold text-blue-500 underline"
                  onClick={() => navigate("/auth/register")}
                >
                  create
                </span>
                a new account.
              </p>
            </div>
            <div>
              <img
                src={loginImg}
                className="hidden h-80 object-contain brightness-90 sm:block"
              />
            </div>
          </div>
        </div>
        <div className="">
          <AuthForm isRegister={false} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
