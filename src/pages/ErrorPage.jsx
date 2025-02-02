import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import DarkModeBtn from "../components/buttons/DarkModeBtn";
const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex h-screen items-center justify-center gap-2 dark:bg-darkColor">
      no such page exists
      <div className="invisible">
        <DarkModeBtn />
      </div>
      <div className="cursor-pointer underline" onClick={() => navigate("/")}>
        Return to home
      </div>
    </div>
  );
};

export default ErrorPage;
