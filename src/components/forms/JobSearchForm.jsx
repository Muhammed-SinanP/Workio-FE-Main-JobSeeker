import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobsSearchSchema } from "../../schemas/searchSchema";
import useFetch from "../../hooks/useFetch";

const JobSearchForm = ({ filteredJobs, setFilteredJobs, setSelectedJob }) => {
  const [suggestions, suggestionsError, suggestionsLoading] = useFetch("/job/availableJobTitles");
  const [isJobsLoading, setIsJobsLoading] = useState(false);

  const [focusTitle, setFocusTitle] = useState(false);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedTitleSuggestion, setSelectedTitleSuggestion] = useState(-1);

  useEffect(() => {
    function removeTitleSuggestions(event) {
      if (
        !document.getElementById("jobTitle")?.contains(event.target) &&
        !document.getElementById("jobSuggestions")?.contains(event.target)
      ) {
        setFocusTitle(false);
        setSelectedTitleSuggestion(-1);
      }
    }

    document.addEventListener("mousedown", removeTitleSuggestions);
    document.addEventListener("touchstart", removeTitleSuggestions);

    return () => {
      document.removeEventListener("mousedown", removeTitleSuggestions);
      document.removeEventListener("touchstart", removeTitleSuggestions);
    };
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(jobsSearchSchema) });
  const jobExperience = watch("jobExperience", "");
  const jobTitle = watch("jobTitle");
  const jobLocation = watch("jobLocation");
  useEffect(() => {
    !filteredJobs && setFilteredJobs([]);
  }, [jobTitle, jobExperience, jobLocation]);

  useEffect(() => {
    jobTitle === selectedTitle
      ? setShowTitleSuggestions(false)
      : setShowTitleSuggestions(true);
    setSelectedTitleSuggestion(-1);
  }, [jobTitle]);

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
      setFilteredJobs(null)
     } finally {
      setIsJobsLoading(false);
    }
  }

  const filteredSuggestions = useMemo(() => {
    if (suggestions) {
      return suggestions.filter(element => element.title.toLowerCase().includes(jobTitle.toLowerCase()),
      );
    }
  }, [jobTitle, suggestions]);

  function handleStyleSuggestion(title, searchString) {
    const regex = new RegExp(`(${searchString})`, "gi"); // searchString case-insensitively
    const parts = title.split(regex);

    const styledSuggestion = parts.map((part, index) =>
      part.toLowerCase() === searchString.toLowerCase() ? (
        <span className="font-semibold" key={index}>
          {part}
        </span>
      ) : (
        part
      ),
    );
    return styledSuggestion;
  }

  function handleSelectSuggestion(e) {
    setValue("jobTitle", e.target.innerText, { shouldValidate: true });
    setSelectedTitle(e.target.innerText);
  }

  function handleKeyDown(e) {
    const key = e.key;
    if (
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "Enter"
    ) {
      e.preventDefault();
      if (key === "ArrowUp" && selectedTitleSuggestion >= 0) {
        setSelectedTitleSuggestion((prev) => prev - 1);
      } else if (
        key === "ArrowDown" &&
        selectedTitleSuggestion < filteredSuggestions.length - 1
      ) {
        setSelectedTitleSuggestion((prev) => prev + 1);
      } else if (key === "Enter" && selectedTitleSuggestion >= 0) {
        setValue(
          "jobTitle",
          filteredSuggestions[selectedTitleSuggestion].title,
          { shouldValidate: true },
        );
        setSelectedTitle(filteredSuggestions[selectedTitleSuggestion].title);
        setSelectedTitleSuggestion(-1);
      }
    } else return;
  }

  return (
    <form
      onSubmit={handleSubmit(searchJobs)}
      className="job-search-form-container md:w-3/4"
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
    >
      <div className="job-search-form-column relative">
        <SearchIcon className="dark:text-dark-text" />
        <input
          onKeyDown={handleKeyDown}
          id="jobTitle"
          onFocus={() => {
            setFocusTitle(true);
          }}
          {...register("jobTitle")}
          placeholder="Job title"
          autoComplete="off"
          className={`search-input ${errors?.jobTitle && "border-b border-b-red-500 text-red-500 dark:text-red-500"} pl-2 md:pl-1 dark:text-dark-text`}
        />
        {errors.jobTitle && (
          <p className="absolute -top-7 left-7 rounded-md bg-white px-1.5 py-0.5 text-center text-xxs font-medium tracking-wide text-red-500 shadow-md dark:bg-dark-light">
            {errors.jobTitle?.message}
          </p>
        )}

        {focusTitle &&
          jobTitle &&
          jobTitle.length > 0 &&
          showTitleSuggestions && (
            <ul
              id="jobSuggestions"
              className="absolute top-9 z-10 w-full rounded-md border-0.5 bg-white p-1 shadow-md dark:bg-dark dark:text-dark-text"
            >
              {filteredSuggestions && filteredSuggestions.length > 0 ? (
                filteredSuggestions.slice(0, 10).map((suggestion, index) => (
                  <li
                    key={suggestion._id}
                    onClick={handleSelectSuggestion}
                    className={`${selectedTitleSuggestion === index && "bg-gray-200"} cursor-pointer p-1 text-sm hover:bg-gray-200 dark:hover:text-dark-input`}
                  >
                    {handleStyleSuggestion(suggestion.title, jobTitle)}
                  </li>
                ))
              ) : (
                <li className="p-1 text-sm">/ No data available /</li>
              )}
            </ul>
          )}
      </div>

      <div className="job-search-form-column">
        <LocationOnIcon className="dark:text-dark-text" />
        <input
          id="jobLocation"
          {...register("jobLocation")}
          placeholder="Location (not compulsory)"
          className="search-input pl-2 md:pl-1 dark:text-dark-text"
          autoComplete="off"
        />
      </div>

      <div className="job-search-form-column md:pl-1.5">
        <WorkIcon className="dark:text-dark-text" />
        <select
          id="jobExperience"
          {...register("jobExperience")}
          className={`search-input cursor-pointer border-none ${jobExperience === "" ? "text-placeholder" : "text-black dark:text-dark-text"}`}
        >
          <option value="" className="hidden">
            Experience (not compulsory)
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
