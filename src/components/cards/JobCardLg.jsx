import React, { useEffect, useRef, useState } from "react";
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
import useFetch from "../../hooks/useFetch";
import SkeletonJobCardLg from "../skeletons/SkeletonJobCardLg";
import ErrorDiv from "../ErrorDiv";

const JobCardLg = ({ jobId, refreshPage, refreshCardLg }) => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const detailsRef = useRef(null);
  const timeoutRef = useRef(null);
  const [smallHead, setSmallHead] = useState(false);
  const navigate = useNavigate();
  const [job, jobError, jobLoading] = useFetch(`/job/${jobId}`);
  const [savedData, savedError, savedLoading] = useFetch("/user/mySavedJobs", [
    refreshCardLg,
  ]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    setSavedJobs(savedData?.savedJobs);
  }, [savedData]);

  useEffect(() => {
    const detailsSection = detailsRef.current;

    function handleScroll(e) {
      const element = e.target;
      if (element.scrollTop > 0) {
        setSmallHead(true);
      } else {
        setSmallHead(false);
      }
    }

    detailsSection && detailsSection.addEventListener("scroll", handleScroll);

    return () => {
      detailsSection &&
        detailsSection.removeEventListener("scroll", handleScroll);
      setSmallHead(false);
    };
  }, [job]);

  function findDate(createdDate) {
    const d = new Date(createdDate);
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${date < 10 ? "0" + date : date}-${month < 10 ? "0" + month : month}-${year}`;
  }

  async function sendApplication(jobId) {
    toast.dismiss();
    if (userLoggedIn) {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: `/user/apply/${jobId}`,
        });
        if (response.status === 200) {
          toast.success("Application sent successfully");
        }
      } catch (err) {
        if (err.status === 403) {
          toast("Already applied", {
            icon: "❗",
          });
        } else {
          toast.error("Application send failed");
        }
      }
    } else {
      toast("Login required", {
        icon: "❗",
      });
      navigate("/auth/login");
    }
  }

  async function handleSave(jobId) {
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

  if (jobError) {
    return <ErrorDiv info={"Error occured while fetching job details."} />;
  }

  return (
    <>
      {jobLoading ? (
        <SkeletonJobCardLg />
      ) : (
        <div className="flex h-full flex-col rounded-md border border-brand-dark dark:border-gray-200">
          <div className="flex flex-col gap-2 rounded-t-md border-b border-brand-dark bg-white p-4 dark:border-gray-200 dark:bg-dark-input dark:text-dark-text">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold capitalize tracking-wide text-brand-dark dark:text-brand">
                {job?.title}
              </div>
              <div className="flex items-center gap-4">
                {smallHead && (
                  <button
                    onClick={() => sendApplication(job?._id)}
                    className="btn btn-sm bg-brand text-white hover:bg-brand-dark"
                  >
                    Apply
                  </button>
                )}

                <button
                  onClick={(e) => handleSave(job?._id)}
                  title={
                    savedJobs?.some(
                      (savedJobs) => savedJobs?.job._id === job?._id,
                    )
                      ? "Unsave"
                      : "Save"
                  }
                  className="flex h-9 w-8 items-center justify-center rounded-sm text-brand-dark hover:bg-slate-200 dark:text-brand"
                >
                  {savedLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : savedJobs?.some(
                      (savedJobs) => savedJobs?.job._id === job?._id,
                    ) ? (
                    <BookmarkIcon fontSize="large" />
                  ) : (
                    <BookmarkBorderIcon fontSize="large" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 capitalize">
              <div className="text-sm">{job?.employer?.name}</div>
              <div className="h-6 w-1 border-r border-dark-text"></div>
              <div className="flex items-center text-sm">
                <LocationOnIcon fontSize="small" className="p-1 px-0" />
                {job?.location?.city}, {job?.location?.state},{" "}
                {job?.location?.country}
              </div>
            </div>
            {!smallHead && (
              <div className="flex items-center">
                <CurrencyRupeeIcon fontSize="small" />
                {job?.salaryRange?.min} - {job?.salaryRange?.max}{" "}
                <span className="ml-2 font-light">LPA</span>
              </div>
            )}
            {!smallHead && (
              <div>
                <button
                  onClick={() => sendApplication(job?._id)}
                  className="btn bg-brand text-lg text-white hover:bg-brand-dark"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
          <div
            ref={detailsRef}
            className="custom-scrollbar h-full overflow-y-scroll rounded-b-md bg-white pb-1 shadow-inner shadow-gray-400 dark:bg-dark-text dark:shadow-black"
          >
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
              <div className="font-paraFont mt-1 pl-6 text-sm">
                {job?.description}
              </div>
            </div>
            <div className="border-b border-gray-300 px-4 py-4">
              <span className="flex items-center gap-1 font-medium">
                <ErrorIcon fontSize="small" />
                Requirements
              </span>
              <div className="font-paraFont mt-1 pl-6 text-sm">
                {job?.requirements?.map((element, index) => {
                  if (element.length > 0) {
                    return <li key={index}>{element}.</li>;
                  }
                })}
              </div>
            </div>
            <div className="border-b border-gray-300 px-4 py-4">
              <span className="flex items-center gap-1 font-medium">
                <WorkIcon fontSize="small" />
                Experience
              </span>
              <div className="font-paraFont mt-1 pl-6 text-sm">
                {job?.minExperience === 0
                  ? "No experience required"
                  : `Minimum ${job?.minExperience} ${
                      job?.minExperience === 1 ? "year" : "years"
                    } of experience required`}
              </div>
            </div>
            <div className="border-b border-gray-300 p-4">
              <span className="flex items-center gap-1 font-medium">
                <CurrencyRupeeIcon fontSize="small" />
                Pay
              </span>
              <div className="mt-1 pl-6 text-sm">
                {job?.salaryRange?.min} - {job?.salaryRange?.max}{" "}
                <span className="font-light italic">Lakhs Per Annum</span>
              </div>
            </div>
            <div className="border-b border-gray-300 p-4 capitalize">
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
              <div className="font-paraFont mt-1 pl-6 text-sm capitalize">
                {job?.jobType}
              </div>
            </div>
            <div className="border-b border-gray-300 p-4">
              <span className="flex items-center gap-1 font-medium">
                <HomeWorkIcon fontSize="small" />
                Work model
              </span>
              <div className="font-paraFont mt-1 pl-6 text-sm capitalize">
                {job?.workModel}
              </div>
            </div>
            <div className="flex flex-col gap-4 border-gray-300 px-4 py-6 pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pb-6">
              <div className="font-light text-gray-600">
                Date Posted:
                <span className="ml-1 text-sm font-extralight">
                  {findDate(job?.createdAt)}
                </span>
              </div>
              <div className="text-end">
                <button className="btn btn-neutral btn-sm">
                  <FlagIcon fontSize="small" /> Report job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCardLg;
