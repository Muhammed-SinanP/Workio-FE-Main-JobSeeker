import React from "react";

import { useNavigate } from "react-router-dom";

const SignBtn = ({ action, text, icon }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() =>
        navigate(`${action === "login" ? "/sign/login" : "/sign/register"}`)
      }
      className={`signBtn ${
        action === "login"
          ? "bg-brandColor dark:bg-brandColor dark:text-white"
          : "bg-black dark:bg-darkColor-text dark:text-darkColor-input"
      } text-white dark:hover:bg-brandColor-dark dark:hover:text-white dark:active:bg-brandColor-light`}
    >
      {icon && icon}

      <span className="tracking-wide">{text}</span>
    </button>
  );
};

export default SignBtn;
