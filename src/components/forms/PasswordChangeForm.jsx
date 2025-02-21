import React from "react";
import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import toast from "react-hot-toast";

const PasswordChangeForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    ConfirmNewPassword: "",
  });

  const formValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    formData.currentPassword !== formData.newPassword &&
    formData.newPassword === formData.ConfirmNewPassword;
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
      console.log("submit");

      const response = await axiosInstance({
        method: "POST",
        url: "/user/changePassword",
        data: formData,
        params:{
          userRole:"job_seeker"
        }
      });

      if (response.status === 200) {
        console.log("password change success fe");
        toast.success("Password Updated Successfully")
        navigate("/")
      }
      
    } catch (err) {
      console.log("password change failed", err);
      if(err.response.status === 401){
        toast.error("Incorrect Password")
      }
    }
  }
  return (
    <div className="w-11/12 sm:w-80  tracking-wide mx-auto sm:mx-1 shadow-md rounded-lg bg-white dark:bg-darkColor px-8 py-4">
        <form
        className=" flex flex-col gap-2.5"
          onSubmit={handleSubmit}
        >
        <div className="flex flex-col gap-1">
            <label htmlFor="currentPassword">Current password</label>
            <input
              id="currentPassword"
              type="text"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="inputStyle "
              placeholder="****"
            />
          </div>
          <div className="text-end -mt-1.5 ">
            <span
              onClick={() => navigate("/forgotPassword")}
            className="cursor-pointer text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              Forgot password?
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword">New password</label>
            <input
              id="newPassword"
              type="text"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="inputStyle "
              placeholder="****"
              minLength={4}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="ConfirmNewPassword">Confirm new password</label>
            <input
              id="ConfirmNewPassword"
              type="text"
              name="ConfirmNewPassword"
              value={formData.ConfirmNewPassword}
              onChange={handleChange}
              className="inputStyle "
              placeholder="****"
            />
          </div>
          <input
            type="submit"
            value="Update"
          className="btn btn-wide text-base  
            border-none bg-brandColor text-white hover:bg-brandColor-dark"
            disabled={!formValid}
          />
        </form>
      
    </div>
  );
};

export default PasswordChangeForm;
