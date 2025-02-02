import React from "react";
import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const PasswordChangeForm = () => {
  const navigate = useNavigate();
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
        params:{
          userRole:"job_seeker"
        }
      });

      if (response.status === 200) {
        console.log("password change success fe");
        setShowForm(false);
      }
    } catch (err) {
      console.log("password change failed", err);
    }
  }
  return (
    <div className="text-xs md:text-sm">
      <div className="flex justify-start">
        <span
          onClick={() => setShowForm(!showForm)}
          className="flex cursor-pointer items-center font-medium hover:text-brandColor"
        >
          Change password <EditIcon fontSize="small" />
        </span>
      </div>

      {showForm && (
        <form
          className="mt-2 flex w-64 flex-col gap-2 rounded-md border p-4 text-sm"
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
            <span
              onClick={() => navigate("/forgotPassword")}
              className="cursor-pointer text-xs font-medium text-blue-500 hover:text-blue-700"
            >
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
                ? "cursor-pointer hover:bg-brandColor-dark active:scale-95"
                : "cursor-not-allowed opacity-50"
            } rounded-sm bg-brandColor p-1.5 text-xs font-medium text-white`}
            disabled={!formValid}
          />
        </form>
      )}
    </div>
  );
};

export default PasswordChangeForm;
