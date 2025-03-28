import React, { useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useNavigate } from "react-router-dom";

const ResumeWarningBtn = () => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  return (
    <div
      className={`fixed ${showWarning ? "-right-1.5 translate-x-28" : "-right-1 translate-x-0"} top-16 mt-2 z-20 flex transform items-center rounded-l-md bg-white text-xs font-medium shadow-[-2px_2px_4px,-2px_-2px_4px] shadow-gray-700 transition-transform ease-in-out dark:bg-dark-input dark:shadow-black`}
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
        className="cursor-pointer p-2 pr-2.5 tracking-wide text-red-500"
      >
        Upload Resume !
      </span>
    </div>
  );
};

export default ResumeWarningBtn;
