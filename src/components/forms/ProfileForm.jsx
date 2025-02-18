import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const ProfileForm = ({ userProfile }) => {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null)

  const [formData, setFormData] = useState({
    userName: "N/A",
    userEmail: "N/A",
    userResume: "N/A",
  });

  useEffect(() => {
    setFormData({
      userName: userProfile?.profile.name || "N/A",
      userEmail: userProfile?.profile.email || "N/A",
      userResume: userProfile?.profile.resume || "N/A",
    });
  }, [userProfile]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleEdit(){
    
    setEdit(true)
    inputRef.current.focus()
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/user/myProfile",
        data: formData,
        params:{
          userRole:"job_seeker"
        }
      });

      if (response.status === 200) {
        toast.success("Profile update success");
        console.log("update profile success");
        setEdit("");
      }
    } catch (err) {
      console.log("update profile failed", err);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="my-4 flex flex-col gap-4 text-sm"
    >
      <div className=" flex flex-col gap-0.5">

        <label
          className="font-medium"
          htmlFor="userName"
        >
          Name
        </label>
        <input
          ref={inputRef}
          id="userName"
          className={`inputStyle dark:bg-darkColor ${
            edit ? "" : "cursor-auto border-none"
          }`}
          type="text"
          name="userName"
          onChange={handleChange}
          value={formData.userName}
          required
          autoFocus
          readOnly={edit ? false : true}
        />
        
        
        
      </div>
      <div className=" flex flex-col gap-1">
        <label
          className="col-span-3 font-medium md:col-span-3"
          htmlFor="userEmail"
        >
          Email
        </label>
        <input
          
          id="userEmail"
          className={`inputStyle col-span-6 md:col-span-6 dark:bg-darkColor ${
            edit ? "" : "cursor-auto border-none"
          }`}
          type="email"
          name="userEmail"
          onChange={handleChange}
          value={formData.userEmail}
          required
          readOnly={edit ? false : true}
        />
       
      </div>
      <div className=" flex flex-col gap-1">
        <label
          className="font-medium "
          htmlFor="userResume"
        >
          Resume link
        </label>
        <input
        
          id="userResume"
          className={`inputStyle   truncate  dark:bg-darkColor ${
            edit ? "" : "cursor-pointer border-none underline text-blue-500"
          }`}
          type="text"
          onClick={!edit?()=>window.open(formData.userResume):undefined}
          name="userResume"
          onChange={handleChange}
          value={formData.userResume}
          readOnly={edit ? false : true}
        />
       
        
        <div className="absolute top-4 right-4 font-semibold tracking-wide ">
            {edit?<input
              type="submit"
              value="Update profile"
              className="  bg-brandColor  text-white btn btn-xs sm:btn-sm border-none hover:bg-brandColor-dark"
            />: <button className=" text-blue-500 flex items-end" onClick={handleEdit}><EditIcon  className="md:mb-0.5 p-0.5 pb-0 pr-0" fontSize="small"/>Edit profile</button>}
          </div>
        
      </div>
    </form>
  );
};

export default ProfileForm;
