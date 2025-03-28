import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import JobCardSm from "../components/cards/JobCardSm";
import SkeletonJobCardSm from "../components/skeletons/SkeletonJobCardSm";
import PaginationBtn from "../components/buttons/PaginationBtn";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const JobsPage = () => {
  const { userLoggedIn } = useSelector((state) => state.user);
  const [refreshSavedJobs, setRefreshSavedJobs] = useState(false);
  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState(["filter", "sort"]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobsPerPage, setJobsPerPage] = useState(12);
  const [pageNo, setPageNo] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const { register, watch } = useForm({
    defaultValues: {
      experience: 100,
      salary: 100,
      jobType: "",
      workModel: "",
    }
  })

  const experience = watch("experience")
  const salary = watch("salary")
  const jobType = watch("jobType")
  const workModel = watch("workModel")
  const sortCriteria = watch("sortCriteria")
  const sortOrder = watch("sortOrder")

  const [data, error, isLoading] = useFetch(
    `/job/allOpenJobs?experience=${experience}&salary=${salary}&jobType=${jobType}&workModel=${workModel}&sortCriteria=${sortCriteria}&sortOrder=${sortOrder}&pageNo=${pageNo + 1}&jobsPerPage=${jobsPerPage}`,
  );

  const [savedData, savedError, savedLoading] = useFetch(userLoggedIn ? "/user/mySavedJobs" : null, [refreshSavedJobs]);

  function refreshPage() {
    setRefreshSavedJobs(!refreshSavedJobs);
  }

  useEffect(() => {
    setFilteredJobs(data?.jobs);
    setpageCount(data?.totalPages);

  }, [data]);

  useEffect(() => {
    setSavedJobs(savedData?.savedJobs);
  }, [savedData])


  useEffect(() => {
    setPageNo(0)
  }, [experience, salary, jobType, workModel, sortCriteria, sortOrder])


  function handleJobsPerPage(e) {
    const value = e.target.value;
    setJobsPerPage(value);
    setPageNo(0);
  }

  function handleVisibilty(element) {
    if (showDiv.includes(element)) {
      setShowDiv(showDiv.filter((item) => item !== element));
    } else {
      setShowDiv([...showDiv, element]);
    }
  }

  function handleCardClick(job) {
    navigate(`/jobDetails/${job?._id}`);
  }

  function handlePageClick(e) {
    setPageNo(e.selected);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (error) {
    return <ErrorDiv info={"Error occured while fetching jobs."} />;
  }

  return (
    <div className="page-div">
      <div className="inner-div flex flex-col gap-4 pb-0 text-sm capitalize tracking-wider dark:text-dark-text">
        <div className="flex flex-col gap-2 rounded-md border bg-white p-2 dark:bg-dark">
          <div
            className="flex cursor-pointer justify-between text-base font-medium"
            onClick={() => handleVisibilty("filter")}
          >
            Filter
            {showDiv.includes("filter") ? (
              <ArrowDropUpIcon fontSize="small" />
            ) : (
              <ArrowDropDownIcon fontSize="small" />
            )}
          </div>
          {showDiv.includes("filter") && (
            <div className="grid grid-cols-12 gap-4 gap-y-2 sm:gap-6">
              <div className="col-span-6 flex flex-col gap-1 sm:col-span-3">
                <div>Experience</div>
                <select
                  {...register("experience")}
                  className="input-style cursor-pointer"
                >
                  <option value={100} className="text-xs">
                    All
                  </option>
                  <option value={0} className="text-xs">
                    Fresher / &lt; 1 Year
                  </option>
                  <option value={1} className="text-xs">
                    1 year
                  </option>
                  {[...Array(49)].map((_, id) => (
                    <option key={id} value={id + 2} className="text-xs">
                      {id + 2} Years
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 flex flex-col gap-1 sm:col-span-3">
                <div>Salary</div>
                <select
                  {...register("salary")}
                  className="input-style cursor-pointer"
                >
                  <option value={100} className="text-xs">
                    All
                  </option>
                  <option value={1} className="text-xs">
                    &le; 1 LPA
                  </option>
                  <option value={2} className="text-xs">
                    &le; 2 LPA
                  </option>
                  <option value={4} className="text-xs">
                    &le; 4 LPA
                  </option>
                  <option value={8} className="text-xs">
                    &le; 8 LPA
                  </option>
                  <option value={12} className="text-xs">
                    &le; 12 LPA
                  </option>
                  <option value={20} className="text-xs">
                    &le; 20 LPA
                  </option>
                  <option value={50} className="text-xs">
                    &le; 50 LPA
                  </option>
                </select>
              </div>
              <div className="col-span-6 flex flex-col gap-1 sm:col-span-3">
                <div>Job Type</div>
                <select
                  {...register("jobType")}
                  className="input-style cursor-pointer"
                >
                  <option value="" className="text-xs">
                    All
                  </option>
                  <option value="full-time" className="text-xs">
                    Full-time
                  </option>
                  <option value="part-time" className="text-xs">
                    Part-time
                  </option>
                  <option value="internship" className="text-xs">
                    Internship
                  </option>
                  <option value="full-time,part-time" className="text-xs">
                    Both Full-time & Part-time
                  </option>
                  <option value="full-time,internship" className="text-xs">
                    Both Full-time & Internship
                  </option>
                  <option value="part-time,internship" className="text-xs">
                    Both Part-time & Internship
                  </option>
                </select>
              </div>
              <div className="col-span-6 flex flex-col gap-1 sm:col-span-3">
                <div>Work Model</div>
                <select
                  {...register("workModel")}
                  className="input-style cursor-pointer"
                >
                  <option value="" className="text-xs">
                    All
                  </option>
                  <option value="office" className="text-xs">
                    Office
                  </option>
                  <option value="remote" className="text-xs">
                    Remote
                  </option>
                  <option value="hybrid" className="text-xs">
                    Hybrid
                  </option>
                  <option value="office,remote" className="text-xs">
                    Both Office & Remote
                  </option>
                  <option value="office,hybrid" className="text-xs">
                    Both Office & Hybrid
                  </option>
                  <option value="hybrid,remote" className="text-xs">
                    Both Hybrid & Remote
                  </option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 rounded-md border bg-white p-2 dark:bg-dark">
          <div
            className="flex cursor-pointer justify-between text-base font-medium"
            onClick={() => handleVisibilty("sort")}
          >
            Sort by
            {showDiv.includes("sort") ? (
              <ArrowDropUpIcon fontSize="small" />
            ) : (
              <ArrowDropDownIcon fontSize="small" />
            )}
          </div>
          {showDiv.includes("sort") && (
            <div className="grid grid-cols-12 gap-4 sm:gap-6">
              <div className="col-span-6 flex flex-col gap-1 sm:col-span-4 md:col-span-3 lg:col-span-2">
                <select
                  {...register("sortCriteria")}
                  className="input-style cursor-pointer"
                >
                  <option value="name" className="text-xs">
                    Job Title
                  </option>
                  <option value="date" className="text-xs">
                    Date Posted
                  </option>
                </select>
              </div>

              <div className="col-span-6 flex flex-col gap-1 sm:col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3">
                <select
                  {...register("sortOrder")}
                  className="input-style cursor-pointer"
                >
                  <option value="asc" className="text-xs">
                    Ascending
                    {sortCriteria === "name"
                      ? "(A-Z)"
                      : "(Oldest to Newest)"}
                  </option>
                  <option value="desc" className="text-xs">
                    Descending
                    {sortCriteria === "name"
                      ? "(Z-A)"
                      : "(Newest to Oldest)"}
                  </option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <div className="text-start font-medium">Jobs per page:</div>
          <select
            name="jobsPerPage"
            id="jobsPerPage"
            defaultValue={jobsPerPage}
            className="input-style cursor-pointer ml-1 w-14 sm:ml-2"
            onChange={handleJobsPerPage}
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>

      <div className="inner-div pt-0">
        <div className="mt-4 grid min-h-44 grid-cols-12 gap-4 px-10">
          {isLoading ? (
            Array.from({ length: jobsPerPage }, (_, i) => (
              <div
                key={i}
                className="relative col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
              >
                <SkeletonJobCardSm />
              </div>
            ))
          ) : filteredJobs && filteredJobs.length > 0 ? (
            filteredJobs.map((element, index) => (
              <div
                key={index}
                className="col-span-12 rounded-md border border-custom-border-color bg-white shadow-sm hover:border-brand-dark hover:shadow-md sm:col-span-6 lg:col-span-4 xl:col-span-3 dark:bg-dark-input dark:hover:border-gray-200"
              >
                <JobCardSm
                  job={element}
                  handleCardClick={handleCardClick}
                  savedJobs={savedJobs}
                  refreshPage={refreshPage}
                />
              </div>
            ))
          ) : (
            <div className="col-span-12 text-center tracking-wide dark:text-dark-text">
              No jobs found, try another filtering.
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full justify-center">
        <PaginationBtn
          handlePageClick={handlePageClick}
          pageNo={pageNo}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};

export default JobsPage;
