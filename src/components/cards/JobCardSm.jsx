import React, { useRef } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast"

const JobCardSm = ({ job,cardClick,savedJobs,refreshPage }) => {
const timeoutRef = useRef(null)
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

async function handleSave(e,job){
  toast.dismiss()
  e.stopPropagation()
  const toastLoading = toast.loading('Loading...');
  if (timeoutRef.current) {

    clearTimeout(timeoutRef.current)
  }
  const jobId = job?._id;
 
 
  try { 
    const response = await axiosInstance({
    url:"/job/handleSave",
    method:"POST",
      data:{jobId}
  })
  if(response.status===201){
        refreshPage(job)
    timeoutRef.current = setTimeout(() => {
      toast.dismiss(toastLoading);
      toast.success("Saved")
    }, 1000);
         
  }else if(response.status ===200){
    refreshPage(job)
    timeoutRef.current = setTimeout(() => {
      toast.dismiss(toastLoading);
      toast.success("Unsaved")
    }, 1000);
  }
  } catch (err) {
    console.log(err);
    
  } 

}

  return (
    <>
      <div
        onClick={() => cardClick(job)}
        className={`relative border border-white  w-full h-full group flex cursor-pointer flex-col items-start gap-1 rounded-md  bg-white p-3  dark:border-darkColor-input dark:bg-darkColor-input dark:text-darkColor-text `}
      >
        <div className="flex w-full justify-between gap-2.5">
          <div className="text-lg group-hover:underline font-semibold capitalize text-brandColor-dark dark:text-brandColor">
            {job?.title}
          </div>
          <button onClick={(e) => handleSave(e, job)} title={savedJobs?.some(savedJobs => savedJobs?.job._id === job?._id) ? "Unsave" : "Save"} className="text-brandColor-dark hover:bg-slate-200 rounded-sm dark:text-brandColor">
           {savedJobs?.some(savedJobs=>savedJobs?.job?._id === job?._id) ? <BookmarkIcon/>:<BookmarkBorderIcon/>}
          </button>
        </div>
        <div className="text-sm capitalize">{job?.employer?.name}</div>
        <div className="flex items-center text-xs capitalize">
          <LocationOnIcon fontSize="small" className="-ml-1 px-0 py-1" />
          {job?.location?.city}, {job?.location?.state}, {job?.location?.country}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center capitalize">
            <WorkIcon fontSize="small" className="-ml-1 px-0 py-1" />
            {job?.minExperience > 0 ?
              `${job?.minExperience} ${job?.minExperience > 1 ? "years" : "year"} `
              :
              "fresher"}
          </div>
          <div className="h-3/5 border-r-0.5 border-darkColor-text"></div>
          <div className="-ml-1 flex items-center rounded-sm pr-1">
            <CurrencyRupeeIcon fontSize="small" className="-mr-1 px-0 py-1" />
            {job?.salaryRange?.min}-{job?.salaryRange?.max}{" "}
            <span className="ml-1 font-light">LPA</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-medium mb-4 capitalize">
          <div className="rounded-sm bg-gray-200 px-1 py-0.5 dark:bg-darkColor-light">
            {job?.jobType}
          </div>
          <div className="rounded-sm bg-gray-200 px-1 py-0.5 dark:bg-darkColor-light">
            {job?.workModel}
          </div>
        </div>
        <div className="mt-1 w-full text-end text-xs absolute bottom-2 right-2">
          Posted {calculateDays(job?.createdAt)}
        </div>
      </div>
    </>
  );
};

export default JobCardSm;
