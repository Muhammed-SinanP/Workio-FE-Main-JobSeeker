import React, { useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useNavigate } from "react-router-dom";

const ResumeWarningBtn = () => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  return (
    <div
      className={`fixed ${showWarning ? "translate-x-28 -right-1.5" : "translate-x-0 -right-1"}  top-16 z-20 flex transform items-center rounded-l-md bg-white dark:bg-dark-input text-xs font-medium  shadow-md shadow-gray-500 dark:shadow-black transition-transform ease-in-out`}
    >
      <span
        onClick={() => setShowWarning(!showWarning)}
        className="rounded-l-md bg-gray-300 px-0.5 py-2"
      >
        {showWarning ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </span>
      <span
        onClick={() => navigate("/myprofile")}
        className="cursor-pointer text-red-500 tracking-wide p-2 pr-3"
      >
        Upload Resume !
      </span>
    </div>
  );
};

export default ResumeWarningBtn;
