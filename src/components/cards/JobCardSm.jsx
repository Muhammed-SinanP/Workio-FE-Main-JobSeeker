import React, { useRef } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const JobCardSm = ({ job, handleCardClick, savedJobs, refreshPage }) => {
  const timeoutRef = useRef(null);

  function calculateDays(date) {
    const createdDate = new Date(date);
    const currentDate = new Date();
    createdDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    const msDifference = currentDate - createdDate;
    const dateDiffernce = Math.floor(msDifference / (1000 * 60 * 60 * 24));

    if (dateDiffernce === 0) {
      return "today";
    }
    if (dateDiffernce === 1) {
      return "yesterday";
    }
    return `${dateDiffernce} days ago`;
  }

  async function handleSave(e, jobId) {
    e.stopPropagation();
    toast.dismiss();
    const toastLoading = toast.loading("Loading...");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      const response = await axiosInstance({
        url: "/user/handleSave",
        method: "POST",
        data: { jobId },
      });
      if (response.status === 201) {
        timeoutRef.current = setTimeout(() => {
          toast.dismiss(toastLoading);
          toast.success("Saved");
        }, 1000);
      } else if (response.status === 200) {
        timeoutRef.current = setTimeout(() => {
          toast.dismiss(toastLoading);
          toast.success("Unsaved");
        }, 1000);
      }
    } catch (err) {
      toast.dismiss();
      if (err.status === 404) {
        toast("Login required", {
          icon: "❗",
        });
      }
    } finally {
      refreshPage && refreshPage(job);
    }
  }

  return (
    <div
      onClick={() => handleCardClick(job)}
      className={`group relative flex h-full w-full cursor-pointer flex-col items-start gap-1 rounded-md border border-white bg-white p-3 dark:border-dark-input dark:bg-dark-input dark:text-dark-text`}
    >
      <div className="flex w-full justify-between gap-2.5">
        <div className="text-lg font-semibold capitalize text-brand-dark group-hover:underline dark:text-brand">
          {job?.title}
        </div>
        <button
          onClick={(e) => handleSave(e, job?._id)}
          title={
            savedJobs?.some((savedJobs) => savedJobs?.job?._id === job?._id)
              ? "Unsave"
              : "Save"
          }
          className="rounded-sm text-brand-dark hover:bg-slate-200 dark:text-brand"
        >
          {savedJobs?.some((savedJobs) => savedJobs?.job?._id === job?._id) ? (
            <BookmarkIcon />
          ) : (
            <BookmarkBorderIcon />
          )}
        </button>
      </div>
      <div className="text-sm capitalize">
        {job?.employer?.profile.company
          ? job.employer.profile.company
          : job.employer.name}
      </div>
      <div className="flex items-center text-xs capitalize">
        <LocationOnIcon fontSize="small" className="-ml-1 px-0 py-1" />
        {job?.location?.city}, {job?.location?.state}, {job?.location?.country}
      </div>
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center capitalize">
          <WorkIcon fontSize="small" className="-ml-1 px-0 py-1" />
          {job?.minExperience > 0
            ? `${job?.minExperience} ${job?.minExperience > 1 ? "years" : "year"} `
            : "fresher"}
        </div>
        <div className="h-3/5 border-r-0.5 border-dark-text"></div>
        <div className="-ml-1 flex items-center rounded-sm pr-1">
          <CurrencyRupeeIcon fontSize="small" className="-mr-1 px-0 py-1" />
          {job?.salaryRange?.min}-{job?.salaryRange?.max}{" "}
          <span className="ml-1 font-light">LPA</span>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-1 text-xs font-medium capitalize">
        <div className="rounded-sm bg-gray-200 px-1 py-0.5 dark:bg-dark-light">
          {job?.jobType}
        </div>
        <div className="rounded-sm bg-gray-200 px-1 py-0.5 dark:bg-dark-light">
          {job?.workModel}
        </div>
      </div>
      <div className="absolute bottom-2 right-2 mt-1 w-full text-end text-xs">
        Posted {calculateDays(job?.createdAt)}
      </div>
    </div>
  );
};

export default JobCardSm;
