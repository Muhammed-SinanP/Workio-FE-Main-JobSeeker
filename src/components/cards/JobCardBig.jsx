import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DescriptionIcon from "@mui/icons-material/Description";
import ErrorIcon from "@mui/icons-material/Error";
import WorkIcon from "@mui/icons-material/Work";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FlagIcon from '@mui/icons-material/Flag';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast"

const JobCardBig = ({ job }) => {

  const userLoggedIn = useSelector(state=>state.user.userLoggedIn)
  const [smallHead,setSmallHead]=useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const detailsSection = document.querySelectorAll(".jobDetails")
    function handleScroll(event) {
      const element = event.target
      
      if (element.scrollTop > 0) {
        setSmallHead(true)
        console.log("scrolled");
        
      } else {
        setSmallHead(false)
        console.log("scrolled")
      }
    }

    detailsSection.forEach((section) => {
      section.addEventListener("scroll",handleScroll)
      
    });
    
    return () => detailsSection.forEach((section)=>{
      section.removeEventListener("scroll",handleScroll)

    })
  }, []);
 
  function findDate(createdDate){
    const d = new Date(createdDate)
    const date = d.getDate()
    const month = d.getMonth()
    const year = d.getFullYear()
    
    return `${date}-${month}-${year}`
  }

  async function sendApplication(jobId) {
    if(userLoggedIn){
      try {
        const response = await axiosInstance({
          method: "POST",
          url: `/job/apply/${jobId}`,
        });
        console.log(response);
        if (response.status === 200) {
          console.log("application sent success");
          toast.success("Application sent")
          navigate("/myApplications")
        }
      } catch (err) {
        console.log(err);
        if (err.status === 403) {
          console.log("Already applied once ..");
          toast.error("Already applied")
        }
        console.log("application sent err", err.message);
      }
    }
    else{
      window.alert("login first")
    }
   
   
  }
  return (
    <div className="flex flex-col h-full   border shadow-sm shadow-brandColor-dark dark:shadow-gray-200 border-brandColor-dark dark:border-darkColor-text rounded-md ">
      <div className="border-b border-brandColor-dark rounded-t-md p-4 flex flex-col gap-2 bg-white dark:bg-darkColor">
        <div className="text-2xl tracking-wide font-semibold text-brandColor-dark dark:text-brandColor flex items-center justify-between">
          {job?.title}
          <div className="flex gap-4 items-center">
          {smallHead && <button onClick={()=>sendApplication(job?._id)} className="btn btn-sm bg-brandColor hover:bg-brandColor-dark text-white">
            Apply
          </button> }
          <button className="flex items-center"><BookmarkBorderIcon className="" /></button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm">{job?.employer?.name}</div>
          <div className="border-r border-black h-full"></div>
          <div className="text-sm flex items-center">
            <LocationOnIcon fontSize="small" className="p-1 px-0" />
            {job?.location?.city}
          </div>
        </div>
        {!smallHead && <div className="flex items-center ">
          <CurrencyRupeeIcon fontSize="small" />
          {job?.sallaryRange?.min} - {job?.sallaryRange?.max}
        </div>}
        {!smallHead && <div>
          <button onClick={()=>sendApplication(job?._id)} className="btn text-lg bg-brandColor hover:bg-brandColor-dark text-white">
            Apply
          </button>
        </div>}
      </div>
      <div  className="jobDetails text-gray-800 h-full  bg-white dark:bg-darkColor-text shadow-inner shadow-gray-500 pb-1 overflow-auto  rounded-b-md">
        <div className="italic font-medium text-sm px-4 mt-2">
          Greetings from {job?.employer?.name} !!
        </div>
        <div className="font-semibold text-lg border-b border-gray-400 px-4 mt-2">
          Job Details
        </div>
        <div className="px-4 border-b border-gray-300 py-4">
          <span className="font-medium flex gap-1 items-center">
            <DescriptionIcon fontSize="small" />
            Description
          </span>
          <div className="pl-6 text-sm font-paraFont mt-1">
            {job?.description}
          </div>
        </div>
        <div className="px-4 border-b border-gray-300 py-4">
          <span className="font-medium flex items-center gap-1">
            <ErrorIcon fontSize="small" />
            Requirements
          </span>
          <div className="pl-6 text-sm font-paraFont mt-1">
            {job?.requirements}
          </div>
        </div>
        <div className="px-4 border-b border-gray-300 py-4">
          <span className="font-medium flex items-center gap-1">
            <WorkIcon fontSize="small" />
            Experience
          </span>
          <div className="pl-6 text-sm font-paraFont mt-1">
            {job?.minExperience === 0
              ? "No experience required"
              : `Minimum ${job?.minExperience} ${
                  job?.minExperience === 1 ? "year" : "years"
                } of experience required`}
          </div>
        </div>
        <div className="p-4 border-b border-gray-300 ">
          <span className="font-medium flex items-center gap-1">
            <CurrencyRupeeIcon fontSize="small" />
            Pay
          </span>
          <div className="pl-6 text-sm  mt-1">
            {job?.sallaryRange?.min} - {job?.sallaryRange?.max} <span className="font-light italic">Lakhs Per Annum</span>
          </div>
        </div>
        <div className="p-4 border-b border-gray-300 ">
          <span className="font-medium flex items-center gap-1">
            <LocationOnIcon fontSize="small" />
            Location
          </span>
          <div className="pl-6 text-sm  mt-1">
            <div>
              City:
              <span className=""> {job?.location?.city}</span>
            </div>
            <div>State:<span className="">  {job?.location?.state}</span></div>
            <div>Country:<span className="">  {job?.location?.country}</span></div>
          </div>
        </div>
        <div className="p-4 border-b border-gray-400 ">
        <span className="font-medium flex items-center gap-1">
          <WorkHistoryIcon fontSize="small"/>Job type</span><div className="pl-6 font-paraFont text-sm mt-1"> {job?.jobType}</div>
        </div>
        <div className="p-4 border-b border-gray-400">
        <span className="font-medium flex items-center gap-1">
         <HomeWorkIcon fontSize="small"/>Work model</span> <div className="pl-6 text-sm font-paraFont mt-1">{job?.workModel}</div>
        </div>
        <div className="px-4 py-6 flex justify-between items-center border-gray-400">
          <div className="text-gray-500"> Date posted:<span className="font-extralight text-sm"> {findDate(job?.createdAt)}</span></div>
         <button className="bg-gray-300 btn btn-sm"><FlagIcon fontSize="small"/> Report job</button>
        </div>
      </div>
    </div>
  );
};

export default JobCardBig;
