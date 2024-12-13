import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
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
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 function handleDeleteAccount() {


 async function deleteAccount(){
     try {
      const response = await axiosInstance({
 method:"DELETE",
 url:"/user/deleteAccount",
      })
      if(response.status===200){
        console.log("account and jobs deleted")
        navigate("/")
      }
     } catch (err) {

      console.log("err in delete account ",err)
      
     }
    }
    confirm({ title:"Confirm Delete Account",
      description:"Account deletion can't be undone. All data will be removed",
      confirmationText:"Delete Account"
     })
      .then(() => {
       deleteAccount()
      })
      .catch(() => {
       console.log("Delete account cancel");
       
      });
  };
  return (
    <div className="outerDiv">
      <div className="innerDiv min-h-screen   p-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-brandColor-lighter dark:bg-darkColor-text dark:bg-homeColor-darkMode pt-4 pl-8 pr-10 pb-0 rounded-md flex justify-between gap-2 shadow-sm shadow-gray-500 ">
              <div className="flex flex-col  gap-2 pb-2 ">
                <div className="font-bold text-4xl text-brandColor-dark dark:text-gray-950">
                  Your Job Seeker Account
                </div>
                <div className="dark:text-gray-800">Manage your personal info</div>
              </div>
              <div className="flex items-end">
                <img
                  src={profileImg}
                  alt=""
                  className="mix-blend-multiply h-40 object-cover"
                />
              </div>
            </div>
            <div className="bg-white dark:bg-darkColor p-4 rounded-md  shadow-sm shadow-gray-500">
              <div className="border  rounded-md p-2 sm:p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-end gap-2">
                    <div className="bg-homeColor-light rounded-md p-0.5 px-1">
                      <PersonIcon className="text-brandColor-dark dark:text-darkColor-text" />
                    </div>
                    <div className=" font-semibold text-lg">Personal info</div>
                  </div>
                  <div className="text-xs text-gray-600 my-4 dark:text-darkColor-text">
                    Your name is visible to employers and admin
                  </div>
                </div>

                <div className="my-4">
                  <ProfileForm userProfile={userProfile}/>

                  <div>
                    <PasswordChangeForm/>
                  </div>



                </div>

                <div className="mt-20 text-end"><span className=" text-xs md:text-sm hover:text-red-700 text-red-800 font-medium cursor-pointer" onClick={handleDeleteAccount}>Delete account</span></div>
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