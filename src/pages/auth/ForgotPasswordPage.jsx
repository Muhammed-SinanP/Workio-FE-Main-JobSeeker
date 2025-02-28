import React from "react";
import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userRole: "job_seeker",
    userEmail: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/auth/forgotPassword",
        data: formData,
      });
      if (response.status == 200) {
        toast.success("Email Sent Successfully");
        navigate("/");
      }
    } catch (err) {
      console.log("err in send email", err);
      if (err.response.status === 404) {
        toast.error("User Not Found");
      }
    }
  }
  return (
    <div className="outer-div min-h-screen tracking-wide">
      <div className="inner-div flex flex-col items-center justify-center gap-6">
        <div className="text-center font-medium">
          A password reset link will be send to your registered email once you
          click 'Send Reset URL'. Click on that link to create a new password.
        </div>
        <div className="text-center font-medium">NB: Reset URL will be expired after the time limit.</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <div className="flex w-80 flex-col gap-1">
            <label htmlFor="userEmail" className="text-base">
              Provide the registered email
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              onChange={handleChange}
              value={formData.userEmail}
              className="input-style"
              placeholder="abcd@gmail.com"
            />
          </div>
          <div className="mt-2 text-center">
            <input
              type="submit"
              value="Send Reset URL"
              className="cursor-pointer rounded-md bg-brand p-1.5 px-2 text-white hover:bg-brand-dark active:scale-95"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
