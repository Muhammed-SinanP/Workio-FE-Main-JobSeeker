import React, { useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useNavigate } from "react-router-dom";

const ResumeWarningBtn = () => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  return (
    <div
      className={`fixed ${showWarning ? "translate-x-28" : "translate-x-0"} right-0 top-20 z-50 flex transform items-center rounded-l-md bg-white text-xs font-medium text-red-500 shadow-md shadow-gray-600 transition-transform ease-in-out`}
    >
      <span
        onClick={() => setShowWarning(!showWarning)}
        className="rounded-l-md bg-gray-200 px-0.5 py-2"
      >
        {showWarning ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </span>
      <span
        onClick={() => navigate("/myprofile")}
        className="cursor-pointer p-2"
      >
        Upload Resume !
      </span>
    </div>
  );
};

export default ResumeWarningBtn;
