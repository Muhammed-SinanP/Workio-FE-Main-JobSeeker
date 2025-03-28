import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/features/userSlice";
const googleIcon = "/googleIcon.png";
import toast from "react-hot-toast";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm = ({ isRegister }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitAuthForm(data) {
    try {
      const response = await axiosInstance({
        url: isRegister ? "/auth/register" : "/auth/login",
        method: "POST",
        data: data,
      });
      if (response.status === 200) {
        dispatch(saveUserData());
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err) {
      if (err.status === 409) {
        toast.error("User already exists. Please login");
      } else if (err.status == 404) {
        toast.error("No such user exists. Please register");
      } else if (err.status === 401) {
        toast.error("Incorrect password");
      } else {
        toast.error(isRegister ? "Register failed" : "Login failed")
      }
    }
  }

  function googleSignIn() {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/googleSign/job_seeker`;
  }

  return (
    <div className="mx-auto w-80 rounded-lg bg-white px-6 py-4 tracking-wide shadow-md sm:mx-1 md:px-8 dark:bg-dark">
      <div className="mb-4 text-center text-xl font-semibold sm:text-2xl dark:text-dark-text">
        {isRegister ? "Register" : "Login"}
      </div>

      <div className="text-center text-sm font-medium dark:text-dark-text">
        {isRegister ? "Already have an account?" : "New to Workio?"}
        <span
          onClick={() =>
            navigate(`${isRegister ? "/auth/login" : "/auth/register"}`)
          }
          className="ml-1 cursor-pointer font-semibold tracking-wide text-blue-500 hover:underline"
        >
          {isRegister ? "Login" : "Register"}
        </span>
      </div>

      <div className="border-borderColor my-3 mt-4 w-full border-b-0.5"></div>

      <div className="flex w-full items-center justify-center text-center">
        <button
          onClick={googleSignIn}
          className="btn btn-outline btn-md my-1 flex w-full items-center justify-center gap-2 border-brand text-brand hover:border-brand hover:bg-brand hover:text-white"
        >
          <img src={googleIcon} alt="google icon" className="h-4" />
          <span className="text-base">Continue with Google</span>
        </button>
      </div>

      <div className="my-2 mb-3 flex w-full items-center justify-center">
        <div className="border-borderColor w-full border-b-0.5"></div>
        <div className="px-2 text-xs text-gray-400">or</div>
        <div className="border-borderColor w-full border-b-0.5"></div>
      </div>

      {isRegister ? (
        <RegisterForm submitAuthForm={submitAuthForm} />
      ) : (
        <LoginForm submitAuthForm={submitAuthForm} />
      )}
    </div>
  );
};

export default AuthForm;
