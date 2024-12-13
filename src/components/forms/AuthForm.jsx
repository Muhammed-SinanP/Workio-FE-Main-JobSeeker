import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/features/userSlice";
import googleIcon from "../../assets/googleIcon.png";
import toast from 'react-hot-toast';

const AuthForm = ({ isRegister,formData,setFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    (!isRegister || formData.userPassword === formData.userConfirmPassword);

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
        url: isRegister ? "/auth/register/job_seeker" : "/auth/login/job_seeker",
        data: formData,
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(saveUserData());
        toast.success("SignIn success")
        navigate("/");
      }
    } catch (err) {
      
      if(err.status===409){
        toast.error("User already exist.Please login")
      }
      else if(err.status==404){
        toast.error("No such user exists.Please register")
      }
      else if(err.status===401){
        toast.error("Incorrect password")
      }
      else{
        console.error("Error during sign:", err.response?.data?.message || err);
      }
      
    }
  }
  function googleSignIn() {
    try {
      console.log("google clicked");

      window.location.href = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/auth/googleSign/job_seeker`;
    } catch (err) {
      console.log(err);
      navigate("/")
    }
  }
  return (
   
        <div className="border shadow-md bg-white dark:bg-darkColor dark:border-none dark:shadow-gray-100 shadow-brandColor-dark rounded-sm border-brandColor px-10 pb-5">
          <div className="text-center text-xl font-semibold mb-4 mt-2 text-brandColor-dark dark:text-darkColor-text">
            {isRegister ? "Register" : "Login"}
          </div>
          {isRegister ? (
            <div className="text-xs text-center font-extralight">
              Already have an account?{" "}
              <NavLink
                to="/sign/login"
                className="text-blue-600 hover:underline"
              >
                Login
              </NavLink>
            </div>
          ) : (
            <div className="text-xs text-center font-extralight">
              New to Workio?{" "}
              <NavLink
                to="/sign/register"
                className="text-blue-600 hover:underline"
              >
                Register
              </NavLink>
            </div>
          )}
          <div className="w-full  border-b my-3"></div>
         <div className="w-full text-center flex items-center justify-center"> <button
            onClick={googleSignIn}
            className="btn w-full btn-sm btn-outline flex items-center justify-center gap-2  border-brandColor hover:bg-brandColor hover:border-brandColor text-brandColor"
          >
            <img src={googleIcon} alt="google icon" className="h-4" />
            <span className="text-sm">Continue with Google</span>
          </button></div>
          <div className="flex w-full justify-center items-center mt-2">
            <div className="border-b w-full"></div>
            <div className="px-2 text-xs text-gray-400">or</div>
            <div className="border-b w-full"></div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 ">
            {isRegister && (
              <div>
                <label htmlFor="userName" className="text-sm text-brandColor">
                  Your full name
                </label>
                <br />
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  placeholder="Jhon Doe"
                  className="inputStyle text-brandColor-dark dark:text-darkColor-text"
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <label htmlFor="userEmail" className="text-sm text-brandColor">
                Email
              </label>
              <br />
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                placeholder="jhondoe@gmail.com"
                className="inputStyle text-brandColor-dark dark:text-darkColor-text"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="userPassword" className="text-sm text-brandColor">
                Password
              </label>
              <br />
              <input
                type="password"
                id="userPassword"
                name="userPassword"
                value={formData.userPassword}
                placeholder="****"
                className="inputStyle text-brandColor-dark dark:text-darkColor-text"
                onChange={handleChange}
              />
            </div>
            {!isRegister&&<div className="text-end -mt-1.5"><span onClick={()=>navigate("/forgotPassword")} className="text-blue-500 hover:text-blue-700 text-xs cursor-pointer font-medium">forgot password ?</span></div>}

            {isRegister && (
              <div className="">
                <label htmlFor="userConfirmPassword" className="text-sm text-brandColor">
                  Confirm password
                </label>
                <br />
                <input
                  type="password"
                  id="userConfirmPassword"
                  name="userConfirmPassword"
                  value={formData.userConfirmPassword}
                  placeholder="****"
                  className="inputStyle text-brandColor-dark dark:text-darkColor-text"
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="mt-1">
              <input
                type="submit"
                value={isRegister?"Register":"Login"}
                className={`btn border-none btn-sm w-full bg-brandColor text-white hover:bg-brandColor-dark`}
                disabled={!isFormValid}
              />
            </div>
          </form>
        </div>
     
  );
};

export default AuthForm;