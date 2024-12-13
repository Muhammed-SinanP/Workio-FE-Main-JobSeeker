import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast"

const ProfileForm = ({ userProfile }) => {
  const [edit, setEdit] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "N/A",
    userEmail: "N/A",
    userResume: "N/A"
  });

  useEffect(() => {
    setFormData({
      userName: userProfile?.profile.name || "N/A",
      userEmail: userProfile?.profile.email || "N/A",
      userResume:userProfile?.profile.resume || "N/A"
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/user/myProfile",
        data: formData,
      });

      if (response.status === 200) {
        toast.success("Profile update success")
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
      className="flex flex-col gap-4 my-4 text-xs md:text-sm"
    >
      <div className="grid grid-cols-12 md:gap-2 gap-0 items-end">
        <label
          className="md:col-span-3 col-span-3 font-medium"
          htmlFor="userName"
        >
          Name
        </label>
        <input
          id="userName"
          className={`md:col-span-6 dark:bg-darkColor col-span-6 inputStyle ${
            edit === "name" ? "" : "border-none cursor-auto"
          }`}
          type="text"
          name="userName"
          onChange={handleChange}
          value={formData.userName}
          required
          readOnly={edit === "name" ? false : true}
        />
        <div className="col-span-1">
          <EditIcon
            onClick={() => setEdit("name")}
            fontSize="small"
            className="cursor-pointer hover:text-brandColor"
          />
        </div>
        {edit === "name" && (
          <div className="col-span-2">
            <input
              type="submit"
              value="Update"
              className="cursor-pointer text-white hover:bg-brandColor-dark text-xs px-1.5 p-1 rounded-sm bg-brandColor active:scale-95"
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-12 md:gap-2 gap-0 items-end">
        <label
          className="md:col-span-3 col-span-3  font-medium"
          htmlFor="userEmail"
        >
          Email
        </label>
        <input
          id="userEmail"
          className={` dark:bg-darkColor md:col-span-6 col-span-6 inputStyle ${
            edit === "email" ? "" : "border-none cursor-auto"
          }`}
          type="email"
          name="userEmail"
          onChange={handleChange}
          value={formData.userEmail}
          required
          readOnly={edit === "email" ? false : true}
        />
        <div className="col-span-1">
          <EditIcon
            onClick={() => setEdit("email")}
            fontSize="small"
            className="cursor-pointer hover:text-brandColor"
          />
        </div>
        {edit === "email" && (
          <div className="col-span-2">
            <input
              type="submit"
              value="Update"
              className="cursor-pointer text-white hover:bg-brandColor-dark text-xs px-1.5 p-1 rounded-sm bg-brandColor active:scale-95"
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-12 md:gap-2 gap-0 items-end">
        <label
          className="md:col-span-3 col-span-3  font-medium"
          htmlFor="userResume"
        >
          Resume link
        </label>
        <input
          id="userResume"
          className={`md:col-span-6 truncate dark:bg-darkColor col-span-6 inputStyle ${
            edit === "resume" ? "" : "border-none cursor-auto"
          }`}
          type="text"
          name="userResume"
          onChange={handleChange}
          value={formData.userResume}
          
          readOnly={edit === "resume" ? false : true}
        />
        <div className="col-span-1">
          <EditIcon
            onClick={() => setEdit("resume")}
            fontSize="small"
            className="cursor-pointer hover:text-brandColor"
          />
        </div>
        {edit === "resume" && (
          <div className="col-span-2">
            <input
              type="submit"
              value="Update"
              className="cursor-pointer text-white hover:bg-brandColor-dark text-xs px-1.5 p-1 rounded-sm bg-brandColor active:scale-95"
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
