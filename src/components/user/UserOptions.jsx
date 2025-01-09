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
    <div className="flex items-center mr-4">
      <div className="hidden sm:flex justify-evenly gap-2 items-center mt-2">
        {userNavbarData &&
          userNavbarData.map((element, index) => (
            <NavLink
              key={index}
              to={element.path}
              className={({ isActive }) =>
                `flex items-center pb-1 justify-center h-full text-sm font-medium border-b-2 border-white  ${
                  isActive
                    ? "text-brandColor  border-b-brandColor"
                    : "text-gray-900 dark:border-darkColor-input dark:text-darkColor-text  dark:hover:border-b-darkColor-text  hover:border-b-gray-900"
                }`
              }
            >
              <div title={element.title}>{element.icon}</div>
            </NavLink>
          ))}
        <div
          className="flex items-center cursor-pointer hover:text-gray-500"
          title="Logout"
          onClick={handleLogout}
        >
          <LogoutIcon
            fontSize="small"
            className="pb-1  dark:hover:text-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default UserOptions;
