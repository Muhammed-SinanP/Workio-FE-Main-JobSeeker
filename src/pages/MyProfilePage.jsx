import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import profileImg from "../assets/profileImg.jpg";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from 'react-avatar';
import PersonIcon from "@mui/icons-material/Person";
import { useConfirm } from "material-ui-confirm";
import { axiosInstance } from "../config/axiosInstance";
import ProfileForm from "../components/forms/ProfileForm";
import PasswordChangeForm from "../components/forms/PasswordChangeForm";
import SkeletonProfilePage from "../components/skeletons/SkeletonProfilePage";


const MyProfilePage = () => {
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
          params: {
            userRole: "job_seeker"
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
  function handleLogout() {
    async function userLogout() {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/auth/logout",
          params: {
            userRole: "job_seeker"
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
    <div className="outerDiv">
      <div className="innerDiv min-h-screen ">
        {isLoading ? (
         <SkeletonProfilePage/>
        ) : (
            <div className="flex flex-col gap-4 pb-32">
            <div className="flex justify-between gap-2 rounded-md bg-white p-6 shadow-md dark:bg-darkColor-text">
              <div className="flex flex-col gap-2 pb-2  ">
                <div className="text-2xl lg:text-3xl font-bold text-brandColor ">
                  {userProfile?.profile?.name}
                </div>
                <div className="tracking-wide">
                  Manage your job seeker profile
                </div>
              </div>

              <Avatar name={userProfile?.profile?.name} className="rounded-full" color="#00A264" size="70px" />

            </div>
            <div className="rounded-md bg-white p-4 shadow-md dark:text-darkColor-text  dark:bg-darkColor">
              <div className="rounded-md border p-2 sm:p-4 relative">
                <div className="flex flex-col gap-1">
                  <div className="flex items-end mt-2">
                    <div className="bg-homeColor-light rounded-md  px-1">
                      <PersonIcon className=" dark:text-darkColor-text" />
                    </div>
                    <div className="text-lg font-semibold -mb-0.5">Personal info</div>
                  </div>
                  {/* <div className="mb-4 text-xs text-gray-600 dark:text-darkColor-text">
                    Your name is visible to employers and admin
                  </div> */}
                </div>

                <div className="my-4">
                  <ProfileForm userProfile={userProfile} />

                  <div className="">
                    {/* <PasswordChangeForm /> */}
                      <span onClick={()=>navigate("/changePassword")} className="font-semibold  cursor-pointer hover:underline active:underline">Change password</span> 
                  </div>
                </div>

                <div className="mt-20  text-end">
                  <span 
                      className="cursor-pointer p-2 pr-0 text-xs font-medium text-red-800 hover:text-red-700 md:text-sm"
                    onClick={handleDeleteAccount}
                  >
                    Delete account
                  </span>
                </div>
              </div>
            </div>


              <div><button onClick={handleLogout} className="btn btn-sm  bg-slate-300 hover:bg-slate-400 dark:bg-slate-400 dark:hover:bg-slate-300 text-brandColor-text border-none  tracking-wide"><LogoutIcon className="p-1 pl-0 -mr-2.5"/>Logout</button>
              </div>

            
          </div>
        )}
      </div>
    </div>
    // <div className="outerDiv min-h-screen">

    // </div>
  );
};

export default MyProfilePage;
