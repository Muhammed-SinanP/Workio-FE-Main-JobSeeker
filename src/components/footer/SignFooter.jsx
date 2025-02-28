import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

const SignFooter = () => {
  return (
    <div className="py-6">
      <div className="m-2 flex justify-center gap-2 p-2">
        <FacebookIcon
          fontSize="small"
          className="cursor-pointer hover:text-blue-400"
        />
        <InstagramIcon
          fontSize="small"
          className="cursor-pointer hover:text-rose-400"
        />
        <XIcon fontSize="small" className="cursor-pointer hover:text-black" />
      </div>
      <div className="text-center text-xs">
        Workio, Inc. &copy; All Rights Reserved Worldwide
      </div>
    </div>
  );
};

export default SignFooter;
