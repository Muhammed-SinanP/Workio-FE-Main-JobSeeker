import React from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../../schemas/userSchema";

const ProfileForm = ({ userProfile }) => {
  const [edit, setEdit] = useState(false);
  
  const {register,handleSubmit,formState:{errors},setFocus} = useForm({resolver:zodResolver(profileSchema),
    defaultValues:{
      userName: userProfile?.profile.name || "N/A",
      userEmail: userProfile?.profile.email || "N/A",
    }
  })
  

  function handleEdit() {
    setEdit(true);
    setFocus("userName")
  }

  async function handleProfileUpdate(data) {
    
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/user/myProfile",
        data: data,
      });

      if (response.status === 200) {
        toast.success("Profile update success");
        setEdit(false);
      }
    } catch (err) {
      toast.error("Profile updation failed")
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleProfileUpdate)} className="mb-2 gap-2 flex flex-col  text-dark dark:text-dark-text">
        <div className="flex flex-col">
          <label className="font-medium" htmlFor="userName">
           Your Name
          </label>
          <input
            id="userName"
            className={`input-style capitalize bg-transparent ${
              edit ? "" : "cursor-auto border-none -mt-1.5"
            }`}
           {...register("userName")}
            readOnly={edit ? false : true}
          />
          {errors.userName && <p className="err-msg">{errors.userName.message}</p>}
        </div>
        <div className="flex flex-col">
          <label
            className="font-medium"
            htmlFor="userEmail"
          >
            Email
          </label>
          <input
            id="userEmail"
            className={`input-style bg-transparent  ${
              edit ? "" : "cursor-auto border-none -mt-1.5"
            }`}
            {...register("userEmail")}
            readOnly={edit ? false : true}
          />
          {errors.userEmail && <p className="err-msg">{errors.userEmail.message}</p>}
        </div>
        <div className="absolute right-4 top-4 font-semibold tracking-wide">
          {edit ? (
            <input
              type="submit"
              value="Update"
              className="btn btn-sm bg-green-500 hover:bg-green-600 text-white "
            />
          ) : (
            <button
                className="flex items-center text-xs md:text-sm text-blue-500"
              onClick={handleEdit}
            >
              <EditIcon className="" fontSize="small" />
              <span className="-mb-0.5 flex">
                Edit<span className="ml-1 hidden sm:block">profile</span>
              </span>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ProfileForm;