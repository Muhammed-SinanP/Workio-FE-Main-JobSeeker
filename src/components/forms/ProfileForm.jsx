import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const ProfileForm = ({ userProfile }) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);

  const [formData, setFormData] = useState({
    userName: "N/A",
    userEmail: "N/A",
  });

  useEffect(() => {
    setFormData({
      userName: userProfile?.profile.name || "N/A",
      userEmail: userProfile?.profile.email || "N/A",
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

  function handleEdit() {
    setEdit(true);
    inputRef.current.focus();
  }

  async function handleSubmit(e) {
    console.log("aa");

    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/user/myProfile",
        data: formData,
        params: {
          userRole: "job_seeker",
        },
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
    <>
      <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-medium" htmlFor="userName">
            Name
          </label>
          <input
            ref={inputRef}
            id="userName"
            className={`input-style capitalize dark:bg-dark ${
              edit ? "" : "cursor-auto border-none"
            }`}
            type="text"
            name="userName"
            onChange={handleChange}
            value={formData.userName}
            required
            readOnly={edit ? false : true}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="col-span-3 font-medium md:col-span-3"
            htmlFor="userEmail"
          >
            Email
          </label>
          <input
            id="userEmail"
            className={`input-style col-span-6 md:col-span-6 dark:bg-dark ${
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
        <div className="absolute right-4 top-4 font-semibold tracking-wide">
          {edit ? (
            <input
              type="submit"
              value="Update"
              className="btn btn-sm border-none bg-brand text-white hover:bg-brand-dark"
            />
          ) : (
            <button
              className="flex items-center text-blue-500"
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
