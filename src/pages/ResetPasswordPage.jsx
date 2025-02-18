import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const resetToken = params.resetToken;
  const [formData, setFormData] = useState({
    newPassword: "",
    ConfirmNewPassword: "",
  });
  const formValid =
    formData.newPassword.trim() !== "" &&
    formData.ConfirmNewPassword.trim() !== "" &&
    formData.newPassword === formData.ConfirmNewPassword;
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/auth/resetPassword/${resetToken}`,
        data: formData,
      });
      if (response.status === 200) {
        toast.success("Password Updated Successfully")
        navigate("/");
      }
    } catch (err) {
      console.log("err reseting password fe", err);
    }
  }
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
  return (
    <div className="min-h-screen outerDiv">
      <div className="innerDiv w-full flex justify-center items-center mt-8">
      
        <div className="w-11/12 sm:w-80  tracking-wide mx-auto sm:mx-1 shadow-md rounded-lg bg-white dark:bg-darkColor px-8 py-4">
        <form
          onSubmit={handleSubmit}
            className=" flex flex-col gap-2.5"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword" >
              Enter new password
            </label>
            <input
              type="text"
              id="newPassword"
              name="newPassword"
              onChange={handleChange}
              value={formData.newPassword}
              className="inputStyle"
              required
              placeholder="****"
              minLength={4}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="ConfirmNewPassword" >
              Confirm new password
            </label>
            <input
              type="text"
              id="ConfirmNewPassword"
              name="ConfirmNewPassword"
              onChange={handleChange}
              value={formData.ConfirmNewPassword}
              className="inputStyle"
              required
              placeholder="****"
            />
          </div>
          <div className="mt-2 text-center">
            <input
              type="submit"
              className="btn btn-wide bg-brandColor hover:bg-brandColor-dark text-white text-base"
              disabled={!formValid}
            />
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
