import React from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../../schemas/userSchema";

const ProfileForm = ({ userProfile,refreshPage }) => {
  const [edit, setEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userName: userProfile?.profile.name || "N/A",
      userEmail: userProfile?.profile.email || "N/A",
    },
  });

  function handleEdit(e) {
    e.preventDefault();
    setEdit(true);
    setFocus("userName");
  }

  async function handleProfileUpdate(data) {
    toast.dismiss()
    const loading = toast.loading("Updating profile")
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/user/myProfile",
        data: data,
      });
      toast.dismiss(loading)
      if (response.status === 200) {
        refreshPage()
        toast.success("Profile updated successfully");
        setEdit(false);
      }else{
        toast.error("Profile updation failed");
      }
    } catch (err) {
      toast.dismiss(loading)
      toast.error("Profile updation failed");
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(handleProfileUpdate)}
        className="mb-2 flex flex-col gap-2 text-sm text-dark dark:text-dark-text"
      >
        <div className="flex flex-col">
          <label className="font-medium" htmlFor="userName">
            Your Name
          </label>
          <input
            id="userName"
            className={`input-style bg-transparent capitalize ${
              edit ? "" : "-mt-1.5 cursor-auto border-none"
            }`}
            {...register("userName")}
            readOnly={edit ? false : true}
          />
          {errors.userName && (
            <p className="err-msg">{errors.userName.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-medium" htmlFor="userEmail">
            Email
          </label>
          <input
            id="userEmail"
            className={`input-style bg-transparent ${
              edit ? "" : "-mt-1.5 cursor-auto border-none"
            }`}
            {...register("userEmail")}
            readOnly={edit ? false : true}
          />
          {errors.userEmail && (
            <p className="err-msg">{errors.userEmail.message}</p>
          )}
        </div>
        <div className="absolute right-4 top-4 font-medium tracking-wide">
          {edit ? (
            // <input
            //   type="submit"
            //   value="Update"
            //   className="btn btn-xs text-xs bg-green-500 hover:bg-green-600 text-white "
            // />
            <button
              type="submit"
              className="btn btn-xs border-none bg-green-500 text-xs text-white hover:bg-green-600 md:text-sm"
            >
              Update
            </button>
          ) : (
            <button
              className="flex items-center text-xs text-blue-500 md:text-sm"
              onClick={handleEdit}
            >
              <EditIcon className="p-0.5 pr-0" fontSize="small" />
              Edit<span className="ml-1 hidden sm:block">profile</span>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
