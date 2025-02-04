import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userNavbarData } from "../Data";
import LogoutIcon from "@mui/icons-material/Logout";
import { useConfirm } from "material-ui-confirm";
import { axiosInstance } from "../../config/axiosInstance";

const UserOptions = () => {
  const confirm = useConfirm();
  const navigate = useNavigate();
  function handleLogout() {
    async function userLogout() {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/auth/logout",
          params:{
            userRole:"job_seeker"
          }
        });
        if (response.status === 200) {
          navigate("/sign/login");
        }
      } catch (err) {
        console.log("logout err occured", err);
      }
    }

    confirm({
      title: "Logout Confirmation",
      description: "Are you sure you want to do logout?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    })
      .then(() => {
        userLogout();
      })
      .catch(() => {
        console.log("logout cancelled");
      });
  }
  return (
    <div className=" flex items-center">
      <div className="mt-2 hidden items-end justify-evenly gap-2 sm:flex">
        {userNavbarData &&
          userNavbarData.map((element, index) => (
            <NavLink
              key={index}
              to={element.path}
              className={({ isActive }) =>
                `flex h-full items-center justify-center border-b-2 border-white pb-1 text-sm font-medium ${
                  isActive
                    ? "border-b-brandColor text-brandColor"
                    : " hover:border-b-brandColor-text dark:border-darkColor-input dark:text-darkColor-text dark:hover:border-b-darkColor-text"
                }`
              }
            >
              <div title={element.title}>{element.icon}</div>
            </NavLink>
          ))}
        <div
          className="flex cursor-pointer items-center bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 hover:bg-gray-400 pt-1 mb-1 rounded-sm"
          title="Logout"
          onClick={handleLogout}
        >
          <LogoutIcon
            fontSize="small"
            className=" pb-1 dark:text-darkColor-text"
          />
        </div>
      </div>
    </div>
  );
};

export default UserOptions;
