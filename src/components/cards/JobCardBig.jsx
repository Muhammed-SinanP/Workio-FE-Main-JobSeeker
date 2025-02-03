import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DescriptionIcon from "@mui/icons-material/Description";
import ErrorIcon from "@mui/icons-material/Error";
import WorkIcon from "@mui/icons-material/Work";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import FlagIcon from "@mui/icons-material/Flag";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const JobCardBig = ({ job }) => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const [smallHead, setSmallHead] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const detailsSection = document.querySelectorAll(".jobDetails");
    function handleScroll(event) {
      const element = event.target;

      if (element.scrollTop > 0) {
        setSmallHead(true);
        console.log("scrolled");
      } else {
        setSmallHead(false);
        console.log("scrolled");
      }
    }

    detailsSection.forEach((section) => {
      section.addEventListener("scroll", handleScroll);
    });

    return () =>
      detailsSection.forEach((section) => {
        section.removeEventListener("scroll", handleScroll);
      });
  }, []);

  function findDate(createdDate) {
    const d = new Date(createdDate);
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${date < 10 ? "0" + date : date}-${month < 10 ? "0" + month : month}-${year}`;
  }

  async function sendApplication(jobId) {
    if (userLoggedIn) {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: `/job/apply/${jobId}`,
          params:{
            userRole:"job_seeker"
          }
        });
        console.log(response);
        if (response.status === 200) {
          console.log("application sent success");
          toast.success("Application sent");
        }
      } catch (err) {
        console.log(err);
        if (err.status === 403) {

          toast("Already applied!", {
            icon: "❗",
          });
        }
        console.log("application sent err", err.message);
      }
    } else {
      toast.error("Login required");
      navigate("/sign/login");
    }
  }
  return (
    <div className="flex h-full flex-col rounded-md border border-brandColor-dark  dark:border-gray-200 ">
      <div className="flex flex-col gap-2 rounded-t-md border-b dark:text-darkColor-text border-brandColor-dark bg-white p-4 dark:bg-darkColor-input dark:border-gray-200">
        <div className="flex items-center justify-between ">
          <div className="text-2xl font-semibold tracking-wide text-brandColor-dark dark:text-brandColor">{job?.title}</div>
          <div className="flex items-center gap-4">
            {smallHead && (
              <button
                onClick={() => sendApplication(job?._id)}
                className="btn btn-sm bg-brandColor text-white hover:bg-brandColor-dark"
              >
                Apply
              </button>
            )}
            <button className="flex items-center text-brandColor-dark dark:text-brandColor">
              <BookmarkBorderIcon />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm">{job?.employer?.name}</div>
          <div className="h-6 w-1  border-r border-darkColor-text"></div>
          <div className="flex items-center text-sm">
            <LocationOnIcon fontSize="small" className="p-1 px-0" />
            {job?.location?.city}
          </div>
        </div>
        {!smallHead && (
          <div className="flex items-center">
            <CurrencyRupeeIcon fontSize="small" />
            {job?.sallaryRange?.min} - {job?.sallaryRange?.max}{" "}
            <span className="ml-2 font-light">LPA</span>
          </div>
        )}
        {!smallHead && (
          <div>
            <button
              onClick={() => sendApplication(job?._id)}
              className="btn bg-brandColor text-lg text-white hover:bg-brandColor-dark"
            >
              Apply
            </button>
          </div>
        )}
      </div>
      <div className="jobDetails h-full overflow-auto rounded-b-md bg-white pb-1  shadow-inner  shadow-gray-400 dark:shadow-black dark:bg-darkColor-text">
        <div className="mt-2 px-4 text-sm font-medium italic">
          Greetings from {job?.employer?.name} !!
        </div>
        <div className="mt-2 border-b border-gray-300 px-4 text-lg font-semibold">
          Job Details
        </div>
        <div className="border-b border-gray-300 px-4 py-4">
          <span className="flex items-center gap-1 font-medium">
            <DescriptionIcon fontSize="small" />
            Description
          </span>
          <div className="mt-1 pl-6 font-paraFont text-sm">
            {job?.description}
          </div>
        </div>
        <div className="border-b border-gray-300 px-4 py-4">
          <span className="flex items-center gap-1 font-medium">
            <ErrorIcon fontSize="small" />
            Requirements
          </span>
          <div className="mt-1 pl-6 font-paraFont text-sm">
            {job?.requirements}
          </div>
        </div>
        <div className="border-b border-gray-300 px-4 py-4">
          <span className="flex items-center gap-1 font-medium">
            <WorkIcon fontSize="small" />
            Experience
          </span>
          <div className="mt-1 pl-6 font-paraFont text-sm">
            {job?.minExperience === 0
              ? "No experience required"
              : `Minimum ${job?.minExperience} ${job?.minExperience === 1 ? "year" : "years"
              } of experience required`}
          </div>
        </div>
        <div className="border-b border-gray-300 p-4">
          <span className="flex items-center gap-1 font-medium">
            <CurrencyRupeeIcon fontSize="small" />
            Pay
          </span>
          <div className="mt-1 pl-6 text-sm">
            {job?.sallaryRange?.min} - {job?.sallaryRange?.max}{" "}
            <span className="font-light italic">Lakhs Per Annum</span>
          </div>
        </div>
        <div className="border-b border-gray-300 p-4">
          <span className="flex items-center gap-1 font-medium">
            <LocationOnIcon fontSize="small" />
            Location
          </span>
          <div className="mt-1 pl-6 text-sm">
            <div>
              City:
              <span className=""> {job?.location?.city}</span>
            </div>
            <div>
              State:<span className=""> {job?.location?.state}</span>
            </div>
            <div>
              Country:<span className=""> {job?.location?.country}</span>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300 p-4">
          <span className="flex items-center gap-1 font-medium">
            <WorkHistoryIcon fontSize="small" />
            Job type
          </span>
          <div className="mt-1 pl-6 font-paraFont text-sm"> {job?.jobType}</div>
        </div>
        <div className="border-b border-gray-300 p-4">
          <span className="flex items-center gap-1 font-medium">
            <HomeWorkIcon fontSize="small" />
            Work model
          </span>{" "}
          <div className="mt-1 pl-6 font-paraFont text-sm">
            {job?.workModel}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 border-gray-300 px-4 py-6 pb-2 sm:pb-6">
          <div className="text-gray-600 font-light">
            Date posted:
            <span className="text-sm font-extralight ml-1">
              {findDate(job?.createdAt)}
            </span>
          </div>
          <div className="text-end">
            <button className="btn btn-sm btn-neutral">
              <FlagIcon fontSize="small" /> Report job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardBig;
