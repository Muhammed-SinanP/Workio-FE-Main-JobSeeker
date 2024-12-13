import React from "react";
import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom"

const PasswordChangeForm = () => {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false);
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
      });

      if (response.status === 200) {
        console.log("password change success fe");
        setShowForm(false)
      }
    } catch (err) {
      console.log("password change failed", err);
    }
  }
  return (
    <div className="text-xs md:text-sm">
      <div className="flex justify-start">
        <span onClick={()=>setShowForm(!showForm)} className="flex items-center font-medium  cursor-pointer hover:text-brandColor">
          Change password <EditIcon fontSize="small" />
        </span>
      </div>

      {showForm && (
        <form
          className="border rounded-md p-4 flex flex-col gap-2 mt-2 w-64 text-sm "
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="currentPassword">Current password</label>
            <input
              id="currentPassword"
              type="text"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="inputStyle w-full"
            />
          </div>
          <div className="text-end">
            <span onClick={()=>navigate("/forgotPassword")} className="text-xs cursor-pointer font-medium text-blue-500 hover:text-blue-700">
              Forgot password?
            </span>
          </div>
          <div>
            <label htmlFor="newPassword">New password</label>
            <input
              id="newPassword"
              type="text"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="inputStyle w-full"
            />
          </div>
          <div>
            <label htmlFor="ConfirmNewPassword">Confirm new password</label>
            <input
              id="ConfirmNewPassword"
              type="text"
              name="ConfirmNewPassword"
              value={formData.ConfirmNewPassword}
              onChange={handleChange}
              className="inputStyle w-full"
            />
          </div>
          <input
            type="submit"
            value="Submit"
            className={`${
              formValid
                ? "cursor-pointer active:scale-95  hover:bg-brandColor-dark"
                : "cursor-not-allowed opacity-50"
            } text-white text-xs  p-1.5 font-medium rounded-sm bg-brandColor `}
            disabled={!formValid}
          />
        </form>
      )}
    </div>
  );
};

export default PasswordChangeForm;
