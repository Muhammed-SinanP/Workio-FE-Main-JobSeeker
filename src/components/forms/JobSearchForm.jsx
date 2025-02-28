import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSearchSchema } from "../../schemas/searchSchema";

const JobSearchForm = ({ filteredJobs, setFilteredJobs, setSelectedJob }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(jobSearchSchema) });
  const jobExperience = watch("jobExperience", "");
  const jobTitle = watch("jobTitle");
  const jobLocation = watch("jobLocation");

  const [isJobsLoading, setIsJobsLoading] = useState(false);

  useEffect(() => {
    !filteredJobs && setFilteredJobs([]);
  }, [jobTitle, jobExperience, jobLocation]);

  async function searchJobs(data) {
    setIsJobsLoading(true);
    try {
      const response = await axiosInstance({
        url: "/job/search",
        method: "POST",
        data: data,
      });

      if (response.status === 200) {
        setFilteredJobs(
          response?.data?.data.length > 0 ? response?.data?.data : null,
        );
        const firstSelectedJob = response?.data?.data[0] || null;
        setSelectedJob(firstSelectedJob);
      }
    } catch (err) {
      console.log("err in filtereing", err);
    } finally {
      setIsJobsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(searchJobs)}
      className="job-search-form-container"
    >
      <div className="job-search-form-column relative">
        <SearchIcon className="dark:text-dark-text" />
        <input
          id="jobTitle"
          {...register("jobTitle")}
          placeholder="Job title"
          className={`search-input ${errors?.jobTitle && "border-b border-b-red-500 text-red-500 dark:text-red-500"} pl-2 md:pl-1 dark:text-dark-text`}
        />
        {errors.jobTitle && (
          <p className="absolute -top-7 left-7 rounded-md bg-white px-1.5 py-0.5 text-xxs font-medium tracking-wide text-red-500 shadow-md dark:bg-dark-light">
            {errors.jobTitle?.message}
          </p>
        )}
      </div>

      <div className="job-search-form-column">
        <LocationOnIcon className="dark:text-dark-text" />
        <input
          id="jobLocation"
          {...register("jobLocation")}
          placeholder="Location"
          className="search-input pl-2 md:pl-1 dark:text-dark-text"
        />
      </div>

      <div className="job-search-form-column md:pl-1.5">
        <WorkIcon className="dark:text-dark-text" />
        <select
          id="jobExperience"
          // name="jobExperience"
          {...register("jobExperience")}
          className={`search-input cursor-pointer border-none ${jobExperience === "" ? "text-placeholder" : "text-black dark:text-dark-text"}`}
        >
          <option value="" className="hidden">
            Experience
          </option>
          <option value={0} className="text-xs">
            Fresher / &lt; 1 year
          </option>
          <option value={1} className="text-xs">
            1 year
          </option>
          {[...Array(49)].map((_, id) => (
            <option key={id} value={id + 2} className="text-xs">
              {id + 2} years
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          className="btn btn-wide mt-2.5 border-none bg-brand text-lg text-white md:btn-square hover:bg-brand-dark active:bg-brand-dark md:ml-2 md:mt-0 md:text-base"
          type="submit"
        >
          {isJobsLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <span className="tracking-wide">
              Find <span className="md:hidden">jobs</span>
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default JobSearchForm;
