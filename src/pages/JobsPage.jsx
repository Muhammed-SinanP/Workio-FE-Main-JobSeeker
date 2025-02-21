import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import JobCardSm from "../components/cards/JobCardSm";
import SkeletonJobCardSm from "../components/skeletons/SkeletonJobCardSm";
import PaginationBtn from "../components/PaginationBtn";

const JobsPage = () => {
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState(["filter", "sort"])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [savedJobs,setSavedJobs] = useState([])
  const [jobsPerPage, setJobsPerPage] = useState(8)
  const [pageNo, setPageNo] = useState(0)
  const [pageCount, setpageCount] = useState(0)
  const [filterData, setFilterData] = useState({
    experience: 100,
    salary: 100,
    jobType: "",
    workModel: ""
  })
  const [sortData, setSortData] = useState({
    sortCriteria: "name",
    sortOrder: "asc"
  })
  const [data, error, isLoading] = useFetch(`/job/allOpen?experience=${filterData.experience}&salary=${filterData.salary}&jobType=${filterData.jobType}&workModel=${filterData.workModel}&sortCriteria=${sortData.sortCriteria}&sortOrder=${sortData.sortOrder}&pageNo=${pageNo + 1}&jobsPerPage=${jobsPerPage}`);
  const [savedData, savedError, savedLoading] = useFetch("/user/saveList", [refresh]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function refreshPage() {
    setRefresh(!refresh)
  }

  useEffect(() => {
    setFilteredJobs(data?.jobs)
    setSavedJobs(savedData?.savedJobs)
    setpageCount(data?.totalPages)
  }, [data,savedData])


  function handleFitlerChange(e) {
    const { name, value } = e.target
    setFilterData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
    setPageNo(null)
    console.log(jobsPerPage)
  }

  function handleSortChange(e) {

    const { name, value } = e.target
    setSortData(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
    setPageNo(0)
  }
  function handleJobsPerPage(e) {
    const value = e.target.value;
    setJobsPerPage(value)
    setPageNo(0)
  }

  function handleVisibilty(element) {
    if (showDiv.includes(element)) {
      setShowDiv(showDiv.filter(item => item !== element))
    }
    else {
      setShowDiv([...showDiv, element])
    }
  }
  function cardClick(job) {
    navigate(`/jobDetails/${job?._id}`);
  }

  function handlePageClick(e) {

    setPageNo(e.selected)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (error) {
    console.log(error)
    return (
      <div className="pt-10 text-center">
        Error occured while fetching jobs..
      </div>
    );
  }

  return (
    <div className="outerDiv min-h-screen">
      <div className="innerDiv text-sm capitalize tracking-wide dark:text-darkColor-text pb-0">


        <div className="flex  ">

          <div className="font-medium "><span className="cursor-pointer flex" onClick={() => handleVisibilty("filter")}>Filter{showDiv.includes("filter") ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}</span></div>
          {showDiv.includes("filter") && <div className="ml-1 grid grid-cols-12 gap-4 gap-y-2 sm:gap-6  sm:ml-2">
            <div className="col-span-6 sm:col-span-3 flex flex-col gap-1">
              <div>Experience</div>
              <select name="experience" id="experience" className="inputStyle" defaultValue={filterData.experience} onChange={handleFitlerChange}>
                <option value={100} className="text-xs">All</option>
                <option value={0} className="text-xs"> Fresher / &lt; 1 Year</option>
                <option value={1} className="text-xs">
                  1 year
                </option>

                {[...Array(49)].map((_, id) =>
                  <option key={id} value={id + 2} className="text-xs">
                    {id + 2} Years
                  </option>
                )}
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3 flex flex-col gap-1">
              <div>Salary</div>
              <select name="salary" id="salary" className="inputStyle" defaultValue={filterData.salary} onChange={handleFitlerChange}>
                <option value={100} className="text-xs">All</option>
                <option value={1} className="text-xs">&le; 1 LPA</option>
                <option value={2} className="text-xs">&le; 2 LPA</option>
                <option value={4} className="text-xs">&le; 4 LPA</option>
                <option value={8} className="text-xs">&le; 8 LPA</option>
                <option value={12} className="text-xs">&le; 12 LPA</option>
                <option value={20} className="text-xs">&le; 20 LPA</option>
                <option value={50} className="text-xs">&le; 50 LPA</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3 flex flex-col gap-1">
              <div>Job Type</div>
              <select name="jobType" id="jobType" className="inputStyle" defaultValue={filterData.jobType} onChange={handleFitlerChange} >
                <option value="" className="text-xs">All</option>
                <option value="full-time" className="text-xs">Full-time</option>
                <option value="part-time" className="text-xs">Part-time</option>
                <option value="internship" className="text-xs">Internship</option>
                <option value="full-time,part-time" className="text-xs">Both Full-time & Part-time</option>
                <option value="full-time,internship" className="text-xs">Both Full-time & Internship</option>
                <option value="part-time,internship" className="text-xs">Both Part-time & Internship</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3 flex flex-col gap-1">
              <div>Work Model</div>
              <select name="workModel" id="workModel" className="inputStyle" defaultValue={filterData.workModel} onChange={handleFitlerChange}>
                <option value="" className="text-xs">All</option>
                <option value="office" className="text-xs">Office</option>
                <option value="remote" className="text-xs">Remote</option>
                <option value="hybrid" className="text-xs">Hybrid</option>
                <option value="office,remote" className="text-xs">Both Office & Remote</option>
                <option value="office,hybrid" className="text-xs">Both Office & Hybrid</option>
                <option value="hybrid,remote" className="text-xs">Both Hybrid & Remote</option>
              </select>
            </div>
          </div>}

        </div>

        <div className="flex  mt-4">

          <div className="font-medium "><span className="cursor-pointer flex" onClick={() => handleVisibilty("sort")}>Sort{showDiv.includes("sort") ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}</span></div>
          {showDiv.includes("sort") && <div className="ml-1 grid grid-cols-12 gap-4 sm:gap-6  sm:ml-2">
            <div className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 flex flex-col gap-1">
              <select name="sortCriteria" id="sortCriteria" className="inputStyle" defaultValue={sortData.sortCriteria} onChange={handleSortChange}>
                <option value="name" className="text-xs">Name</option>
                <option value="date" className="text-xs">Date Posted</option>
              </select>
            </div>

            <div className="col-span-6 sm:col-span-8 md:col-span-6 lg:col-span-4 flex flex-col gap-1">
              <select name="sortOrder" id="sortOrder" className="inputStyle" defaultValue={sortData.sortOrder} onChange={handleSortChange}>
                <option value="asc" className="text-xs">Ascending {sortData.sortCriteria === "name" ? "(A-Z)" : "(Oldest to Newest)"}</option>
                <option value="desc" className="text-xs">Descending {sortData.sortCriteria === "name" ? "(Z-A)" : "(Newest to Oldest)"}</option>
              </select>
            </div>



          </div>}

        </div>

        <div className="flex items-center mt-4">
          <div className="font-medium text-start">Jobs per page:</div>
          <select name="jobsPerPage" id="jobsPerPage" defaultValue={jobsPerPage} className="w-14 inputStyle ml-1 sm:ml-2" onChange={handleJobsPerPage}>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>



      </div>

      <div className="innerDiv pt-0">


        <div className=" grid min-h-44 grid-cols-12 gap-4 px-10  mt-4">
          {isLoading ?
            (
              Array.from({ length: jobsPerPage }, (_, i) =>

                <div key={i} className=" relative  col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 ">

                  <SkeletonJobCardSm />
                </div>)
            )
            :
            (
              filteredJobs && filteredJobs.length > 0 ? (
                filteredJobs.map((element, index) => (
                  <div key={index} className="bg-white dark:bg-darkColor-input  col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 shadow-sm hover:shadow-md border border-borderColor rounded-md hover:border-brandColor-dark dark:hover:border-gray-200">

                    <JobCardSm
                      job={element}
                      cardClick={cardClick}
                      savedJobs={savedJobs}
                      refreshPage={refreshPage}
                    /></div>

                ))
              )
                : (
                  <div className="col-span-12 text-center tracking-wide">No jobs found, try another filtering.</div>
                )

            )
          }
        </div>


      </div>

      <div className="w-full flex justify-center">
        <PaginationBtn handlePageClick={handlePageClick} pageNo={pageNo} pageCount={pageCount} />
      </div>
    </div>
  );
};

export default JobsPage;
