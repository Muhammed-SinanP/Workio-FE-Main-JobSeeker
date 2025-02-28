import React from "react";
import { useNavigate } from "react-router-dom";

const SignBtn = ({ action, text, icon }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() =>
        navigate(`${action === "login" ? "/auth/login" : "/auth/register"}`)
      }
      className={`sign-btn ${action === "login"
        ? "bg-brand"
        : "bg-black dark:bg-dark-text dark:text-dark-input"
        } `}
    >
      {icon}
      <span className="tracking-wide">{text}</span>
    </button>
  );
};

export default SignBtn;
