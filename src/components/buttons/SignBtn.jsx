import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";

const SignBtn = ({ login }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`${login ? "/sign/login" : "/sign/register"}`)}
      className={`signBtn  ${
        login ? "bg-brandColor dark:bg-brandColor-lighter dark:text-darkColor-input" : "bg-black dark:bg-darkColor-text dark:text-darkColor-input"
      }   text-white   dark:hover:bg-brandColor dark:hover:text-white  dark:active:bg-brandColor-light`}
    >
      {login ? (
        <PersonIcon fontSize="small" className="p-1" />
      ) : (
        <AppRegistrationIcon fontSize="small" className="p-1" />
      )}

      <span className="tracking-wide">{login ? "Login" : "Register"}</span>
    </button>
  );
};

export default SignBtn;
