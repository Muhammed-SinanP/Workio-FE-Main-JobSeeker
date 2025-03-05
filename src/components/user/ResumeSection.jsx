import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema } from "../../schemas/uploadSchema";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../redux/features/refreshSlice";

const ResumeSection = ({ resume, refreshProfile, setRefreshProfile }) => {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
  });
  const file = watch("resume");

  async function handleUploadResume(data) {
    toast.dismiss();
    const toastLoading = toast.loading("Uploading...");
    const formData = new FormData();
    formData.append("resume", data.resume[0]);

    try {
      setUploading(true);

      const response = await axiosInstance({
        url: "/user/uploadResume",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status == 200) {
        toast.dismiss(toastLoading);
        setRefreshProfile(!refreshProfile);
        toast.success("Resume uploaded successfully");
      }
    } catch (err) {
      toast.dismiss(toastLoading);
      toast.error("Resume upload failed");
      console.error(err);
    } finally {
      setUploading(false);
      dispatch(toggleRefresh())
    }
  }

  async function handleRemoveResume() {
    toast.dismiss();
    const toastLoading = toast.loading("Removing...");
    try {
      const response = await axiosInstance({
        url: "/user/removeResume",
        method: "DELETE",
      });
      if (response.status === 200) {
        toast.dismiss(toastLoading);
        toast.success("Resume removed successfully");
      }
    } catch (err) {
      toast.dismiss(toastLoading);
      toast.error("Resume removal failed");
    } finally {
      setRefreshProfile(!refreshProfile);
      dispatch(toggleRefresh())
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <p className="font-medium" htmlFor="userResume">
          Resume
        </p>
        <div className="p-1.5">
          {resume ? (
            <div className="flex gap-4 text-sm tracking-wide">
              <span
                onClick={() => window.open(resume, "_blank", "noopener,noreferrer")}
                className="text-blue-500 underline"
              >
                View resume
              </span>
              <span
                onClick={handleRemoveResume}
                className="cursor-pointer text-red-500 underline"
              >
                Remove resume
              </span>
            </div>
          ) : (
            <p className="font-light">N/A</p>
          )}
        </div>
      </div>
      <div className="my-1 flex flex-col gap-2 text-sm tracking-wide">

        <p>
          {resume ? "Update" : "Upload"} Resume:
        </p>


        <form
          className={`flex flex-col items-start justify-center gap-1.5`}
          onSubmit={handleSubmit(handleUploadResume)}
        >
          <input
            type="file"
            title="Choose file"
            className="w-52 text-transparent truncate"
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-xs text-red-500">{errors.resume.message}</p>
          )}

          {file?.length > 0 && !errors.resume && (
            <p>
              Selected File:{" "}
              <span className="text-xs font-medium">{file[0].name}</span>
            </p>
          )}

          <button
            className={`btn btn-xs border-0.5 border-dark-light hover:border-dark-light dark:hover:border-dark-text dark:border-dark-text ${uploading && "btn-disabled"}`}
            type="submit"
          >
            {resume ? "Update" : "Upload"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResumeSection;
