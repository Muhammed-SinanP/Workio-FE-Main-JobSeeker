import React from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";

const RegisterBtn = () => {
  const navigate = useNavigate()
  return (
    <button onClick={()=>navigate("/sign/register")} className=" signBtn text-xs font-medium bg-black dark:bg-gray-950 text-white ">
      <AppRegistrationIcon fontSize="small" className="p-1 pr-0" />
      Register
    </button>
  );
};

export default RegisterBtn;
