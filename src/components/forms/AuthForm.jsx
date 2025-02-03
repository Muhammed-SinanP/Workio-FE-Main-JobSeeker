import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/features/userSlice";
import googleIcon from "../../assets/googleIcon.png";
import toast from "react-hot-toast";

const AuthForm = ({ isRegister, formData, setFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isChecked,setIsChecked] = useState(false)

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    (!isRegister || formData.userPassword === formData.userConfirmPassword && isChecked === true );

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axiosInstance({
        method: "POST",
        url: isRegister
          ? "/auth/register/job_seeker"
          : "/auth/login/job_seeker",
        data: formData,
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(saveUserData());
        toast.success("SignIn success");
        navigate("/");
      }
    } catch (err) {
      if (err.status === 409) {
        toast.error("User already exist.Please login");
      } else if (err.status == 404) {
        toast.error("No such user exists.Please register");
      } else if (err.status === 401) {
        toast.error("Incorrect password");
      } else {
        console.error("Error during sign:", err.response?.data?.message || err);
      }
    }
  }
  function googleSignIn() {
    try {


      window.location.href = `${import.meta.env.VITE_BACKEND_URL
        }/api/auth/googleSign/job_seeker`;
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  }
  return (
    <div className="w-11/12 sm:w-80 lg:w-96 racking-wide mx-auto sm:mx-1 shadow-md rounded-lg bg-white dark:bg-darkColor-input px-8 py-4">
      <div className="mb-4  text-center text-xl font-semibold  dark:text-darkColor-text">
        {isRegister ? "Register" : "Login"}
      </div>
      {isRegister ? (
        <div className="text-center text-xs font-medium dark:text-darkColor-text">
          Already have an account?
          <NavLink to="/sign/login" className="text-blue-500 hover:underline  ml-1 font-semibold">
            Login
          </NavLink>
        </div>
      ) : (
        <div className="text-center text-xs font-medium dark:text-darkColor-text">
          New to Workio?
          <NavLink
            to="/sign/register"
            className="text-blue-500 hover:underline ml-1 font-semibold"
          >
            Register
          </NavLink>
        </div>
      )}
      <div className="my-3 w-full border-b border-borderColor"></div>
      <div className="flex w-full items-center justify-center text-center">
        <button
          onClick={googleSignIn}
          className="btn btn-outline my-1 btn-md flex w-full items-center justify-center gap-2 border-brandColor text-brandColor hover:border-brandColor hover:bg-brandColor"
        >
          <img src={googleIcon} alt="google icon" className="h-4" />
          <span className="text-base">Continue with Google</span>
        </button>
      </div>
      <div className="mt-2 flex w-full items-center justify-center">
        <div className="w-full border-b border-borderColor"></div>
        <div className="px-2 text-xs text-gray-400">or</div>
        <div className="w-full border-b border-borderColor"></div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        {isRegister && (
          <div className="flex flex-col gap-1">
            <label htmlFor="userName" className="dark:text-darkColor-text">
              Your full name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              placeholder="Jhon Doe"
              className="inputStyle  text-brandColor-dark dark:text-darkColor-text"
              onChange={handleChange}
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="userEmail" className="dark:text-darkColor-text">
            Email
          </label>

          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={formData.userEmail}
            placeholder="jhondoe@gmail.com"
            className="inputStyle  dark:text-darkColor-text"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="userPassword" className="dark:text-darkColor-text">
            Password
          </label>
          
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            value={formData.userPassword}
            placeholder="****"
            minLength={4}
            className="inputStyle  dark:text-darkColor-text"
            onChange={handleChange}
          />
        </div>
        {!isRegister && (
          <div className="-mt-1.5 text-end">
            <span
              onClick={() => navigate("/forgotPassword")}
              className="cursor-pointer text-xs font-medium text-blue-500 hover:text-blue-600"
            >
              forgot password ?
            </span>
          </div>
        )}

        {isRegister && (
          <div className="flex flex-col gap-1">
            <label
              htmlFor="userConfirmPassword"
              className="dark:text-darkColor-text"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="userConfirmPassword"
              name="userConfirmPassword"
              value={formData.userConfirmPassword}
              placeholder="****"
              className="inputStyle  dark:text-darkColor-text"
              onChange={handleChange}
            />
          </div>
        )}
        {isRegister && (
          <div className="flex justify-start items-start mt-1  gap-2">
            <input
              type="checkbox"
              id="regCheckbox"
              name="regCheckbox"
              checked={isChecked}
              className="cursor-pointer"
              onChange={(e)=>setIsChecked(e.target.checked)}
            />
            <label
              htmlFor=""
              className="dark:text-darkColor-text text-xs -mt-0.5 font-medium"
            >
              By signing up you agree to our <span className="underline text-blue-500 cursor-pointer">Terms and conditions</span> and <span className="underline text-blue-500 cursor-pointer">Privacy policy</span>
            </label>
            
          </div>
        )}
        <div className="mt-2.5">
          <input
            type="submit"
            value={isRegister ? "Register" : "Login"}
            className={`btn text-base w-full border-none bg-brandColor text-white hover:bg-brandColor-dark`}
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
