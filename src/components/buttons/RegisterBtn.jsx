import React from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";

const RegisterBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/auth/register")}
      className="sign-btn bg-black dark:bg-dark-text dark:text-dark-input"
    >
      <AppRegistrationIcon fontSize="small" className="p-1" />
      <span className="tracking-wide">Register</span>
    </button>
  );
};

export default RegisterBtn;
