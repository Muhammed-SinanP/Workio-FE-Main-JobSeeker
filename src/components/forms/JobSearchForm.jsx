import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";


const JobSearchForm = ({ filteredJobs, setFilteredJobs, setSelectedJob }) => {

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobExperience: "",
  });

  const [isJobsLoading, setIsJobsLoading] = useState(false);

  function handleChange(e) {

    const { name, value } = e.target;

    if (!filteredJobs) {
      setFilteredJobs([])
    }

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsJobsLoading(true);
    try {
      const response = await axiosInstance({
        url: "/job/search",
        method: "POST",
        data: formData,
      });
      if (response.status === 200) {
        setFilteredJobs(response?.data?.data.length > 0 ? response?.data?.data : null);
        const firstSelectedJob = response?.data?.data[0] || null;
        setSelectedJob(firstSelectedJob);

      } else {
        console.log("status not 200 for job search");

      }
    } catch (err) {
      console.log("err in filtereing", err);

    } finally {
      setIsJobsLoading(false)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center tracking-wide rounded-md text-base sm:text-sm bg-white p-2 shadow-md  shadow-brandColor md:flex-row dark:bg-darkColor-input dark:shadow-darkColor"
    >
      <div className="flex w-full items-center pl-1  dark:bg-darkColor-input">
        <SearchIcon className="dark:text-darkColor-text" />
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          minLength={2}
          placeholder="Job title"
          className="searchInput dark:text-darkColor-text dark:bg-darkColor-input pl-2 md:pl-1"
          onChange={handleChange}
          value={formData.jobTitle}
          required
        />
      </div>

      <div className="flex w-full items-center pl-1   dark:bg-darkColor-input">
        <LocationOnIcon className="dark:text-darkColor-text" />
        <input
          id="jobLocation"
          name="jobLocation"
          type="text"
          placeholder="Location"
          minLength={2}
          className="searchInput dark:text-darkColor-text dark:bg-darkColor-input pl-2 md:pl-1"
          onChange={handleChange}
          value={formData.jobLocation}
        />
      </div>
      <div className="flex w-full items-center pl-1 md:pl-1.5 dark:bg-darkColor-input">
        <WorkIcon className="dark:text-darkColor-text" />

        <select
          id="jobExperience"
          name="jobExperience"
          className={`searchInput  cursor-pointer border-none  dark:bg-darkColor-input ${formData.jobExperience === ""
            ? "text-[#9CA3AF]"
            : "text-black dark:text-darkColor-text"
            }`}
          onChange={handleChange}
          value={formData.jobExperience}
          
        >
          <option value="" disabled className="hidden">
            Experience
          </option>
          <option value={0} className="text-xs">
            Fresher / &lt; 1 year
          </option>
          
          <option value={1} className="text-xs">
            1 year
          </option>

          {[...Array(49)].map((_, id)=>
            <option key={id} value={id+2} className="text-xs">
              {id+2} years
            </option>
          )}
          {/* <option value={2} className="text-xs">
            2+ years
          </option>
          <option value={3} className="text-xs">
            3+ years
          </option> */}
        </select>
      </div>
      <div>
        <button
          className="btn btn-wide mt-2.5 md:mt-0 text-lg md:text-base md:btn-square md:ml-2  border-none bg-brandColor text-white hover:bg-brandColor-dark active:bg-brandColor-dark "
          type="submit"
        >
          {isJobsLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <span className="tracking-wide">Find <span className="md:hidden">jobs</span></span>
          )}
        </button>
        {/* <button
          className="btn text-base btn-wide mt-2.5 bg-brandColor text-white hover:bg-brandColor-dark active:bg-brandColor-dark md:hidden"
          type="submit"
        >
          {isJobsLoading ? (
            <span className="flex items-center gap-1">
              Finding jobs<span className="loading loading-spinner"></span>
            </span>
          ) : (
            <span className="">Find jobs</span>
          )}
        </button> */}
      </div>
    </form>
  );
};

export default JobSearchForm;
