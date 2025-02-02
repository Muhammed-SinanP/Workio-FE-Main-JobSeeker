import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import profileImg from "../assets/profileImg.jpg";
import PersonIcon from "@mui/icons-material/Person";
import { useConfirm } from "material-ui-confirm";
import { axiosInstance } from "../config/axiosInstance";
import ProfileForm from "../components/forms/ProfileForm";
import PasswordChangeForm from "../components/forms/PasswordChangeForm";
const MyProfile = () => {
  const [userProfile, error, isLoading] = useFetch("/user/myProfile");
  const confirm = useConfirm();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleDeleteAccount() {
    async function deleteAccount() {
      try {
        const response = await axiosInstance({
          method: "DELETE",
          url: "/user/deleteAccount",
          params:{
            userRole:"job_seeker"
          }
        });
        if (response.status === 200) {
          console.log("account and jobs deleted");
          navigate("/");
        }
      } catch (err) {
        console.log("err in delete account ", err);
      }
    }
    confirm({
      title: "Confirm Delete Account",
      description: "Account deletion can't be undone. All data will be removed",
      confirmationText: "Delete Account",
    })
      .then(() => {
        deleteAccount();
      })
      .catch(() => {
        console.log("Delete account cancel");
      });
  }
  return (
    <div className="outerDiv">
      <div className="innerDiv min-h-screen p-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="dark:bg-homeColor-darkMode flex justify-between gap-2 rounded-md bg-brandColor-lighter pb-0 pl-8 pr-10 pt-4 shadow-sm shadow-gray-500 dark:bg-darkColor-text">
              <div className="flex flex-col gap-2 pb-2">
                <div className="text-4xl font-bold text-brandColor-dark dark:text-gray-950">
                  Your Job Seeker Account
                </div>
                <div className="dark:text-gray-800">
                  Manage your personal info
                </div>
              </div>
              <div className="flex items-end">
                <img
                  src={profileImg}
                  alt=""
                  className="h-40 object-cover mix-blend-multiply"
                />
              </div>
            </div>
            <div className="rounded-md bg-white p-4 shadow-sm shadow-gray-500 dark:bg-darkColor">
              <div className="rounded-md border p-2 sm:p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-end gap-2">
                    <div className="bg-homeColor-light rounded-md p-0.5 px-1">
                      <PersonIcon className="text-brandColor-dark dark:text-darkColor-text" />
                    </div>
                    <div className="text-lg font-semibold">Personal info</div>
                  </div>
                  <div className="my-4 text-xs text-gray-600 dark:text-darkColor-text">
                    Your name is visible to employers and admin
                  </div>
                </div>

                <div className="my-4">
                  <ProfileForm userProfile={userProfile} />

                  <div>
                    <PasswordChangeForm />
                  </div>
                </div>

                <div className="mt-20 text-end">
                  <span
                    className="cursor-pointer text-xs font-medium text-red-800 hover:text-red-700 md:text-sm"
                    onClick={handleDeleteAccount}
                  >
                    Delete account
                  </span>
                </div>
              </div>
            </div>

            <div className="h-60"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
