import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "react-avatar";
import PersonIcon from "@mui/icons-material/Person";
import { useConfirm } from "material-ui-confirm";
import { axiosInstance } from "../../config/axiosInstance";
import ProfileForm from "../../components/forms/ProfileForm";
import SkeletonProfilePage from "../../components/skeletons/SkeletonProfilePage";
import LaunchIcon from "@mui/icons-material/Launch";
import ResumeSection from "../../components/user/ResumeSection";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [refreshProfile, setRefreshProfile] = useState(false);
  const [userProfile, error, isLoading] = useFetch("/user/myProfile", [
    refreshProfile,
  ]);
  const confirm = useConfirm();
  const navigate = useNavigate();

  function refreshPage(){
    setRefreshProfile(!refreshProfile)
  }
  

  function handleDeleteAccount() {
    async function deleteAccount() {
      toast.dismiss()
      const loading = toast.loading("Deleting account")
      try {
        const response = await axiosInstance({
          method: "DELETE",
          url: "/user/deleteMyAccount",
        });
        toast.dismiss(loading)
        if (response.status === 200) {
          toast.success("Account deleted successfully")
          navigate("/");
        }else{
          toast.error("Account deletion failed")
        }
      } catch (err) {
        toast.dismiss(loading)
        toast.error("Account deletion failed")
      }
    }
    confirm({
      title: "Confirm Delete Account",
      description: "Account deletion can't be undone. All your data will be removed",
      confirmationText: "Delete Account",
    })
      .then(() => {
        deleteAccount();
      })
  }
  function handleLogout() {
    async function userLogout() {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/user/logout",
        });
        if (response.status === 200) {
          toast.success("Logged out successfully")
          navigate("/auth/login");
        }else{
          toast.error("User logout failed")
        }
      } catch (err) {
        toast.error("User logout failed")
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
  }
  return (
    <div className="page-div">
      <div className="inner-div">
        {!userProfile ? (
          <SkeletonProfilePage />
        ) : (
          <div className="flex flex-col gap-4 pb-32">
            <div className="flex justify-between gap-2 rounded-md bg-brand-light p-4 shadow-sm sm:p-6 dark:bg-dark-input">
              <div className="flex flex-col gap-2 pb-2">
                <div className="text-xl font-bold text-brand-dark lg:text-3xl dark:text-brand">
                  {userProfile?.profile?.name}
                </div>
                <div className="text-sm tracking-wide dark:text-dark-text">
                  Manage your job seeker profile
                </div>
              </div>

              <Avatar
                name={userProfile?.profile?.name}
                className="rounded-full"
                color="#00A264"
                size="70px"
              />
            </div>
            <div className="rounded-md bg-white p-4 shadow-sm dark:bg-dark dark:text-dark-text">
              <div className="relative rounded-md border p-2 pb-20 pl-3 sm:p-4 sm:pb-28">
                <div className="flex flex-col gap-1">
                  <div className="mt-1.5 flex items-center gap-1">
                    <PersonIcon className="dark:text-dark-text" />

                    <div className="-mb-0.5 flex text-lg font-medium">
                      Personal info
                    </div>
                  </div>
                  <div className="w-2/3 text-xxs tracking-wide text-gray-600 sm:text-xs dark:text-dark-text">
                    Your name is visible to other users
                  </div>
                </div>

                <div className="mt-4">
                  <ProfileForm userProfile={userProfile} refreshPage={refreshPage}/>

                  <ResumeSection
                    resume={userProfile?.profile.resume}
                    refreshProfile={refreshProfile}
                    setRefreshProfile={setRefreshProfile}
                  />
                  <div
                    className="absolute bottom-4 left-4 cursor-pointer text-xs font-medium text-dark-light hover:text-dark md:text-sm dark:text-dark-text dark:hover:text-dark-text"
                    onClick={() => navigate("/changeMyPassword")}
                  >
                    Change password
                    <LaunchIcon fontSize="small" className="p-0.5" />
                  </div>
                </div>

                <div
                  className="absolute bottom-4 right-4 cursor-pointer text-xs font-medium text-red-700 hover:text-red-800 md:text-sm"
                  onClick={handleDeleteAccount}
                >
                  Delete account
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleLogout}
                className="btn btn-sm border-none bg-slate-300 tracking-wide text-brand-text hover:bg-slate-400 dark:bg-slate-400 dark:hover:bg-slate-300"
              >
                <LogoutIcon className="-mr-2.5 p-1 pl-0" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
