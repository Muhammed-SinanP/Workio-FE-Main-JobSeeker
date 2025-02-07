import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import JobCardSm from "../components/cards/JobCardSm";

const JobsPage = () => {
  const navigate = useNavigate();
  const [showDiv,setShowDiv] = useState([])
  
  const [filterData,setFilterData] = useState({
    experience:100,
    salary:100,
    jobType:"",
    workModel:""
  })
  const [sortData, setSortData] = useState({
    sortCriteria: "name",
    sortOrder: "asc"
  })
  const [filteredJobs, error, isLoading] = useFetch(`/job/allOpen?experience=${filterData.experience}&salary=${filterData.salary}&jobType=${filterData.jobType}&workModel=${filterData.workModel}&sortCriteria=${sortData.sortCriteria}&sortOrder=${sortData.sortOrder}`);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



function handleFitlerChange(e){
  const {name,value} = e.target
  setFilterData(prev => {
    return{
      ...prev,
      [name]:value
    }
  })
}

function handleSortChange(e){

  const {name,value} = e.target
  setSortData(prev=>{
    return{
      ...prev,
      [name]:value,
    }
  })
}
 function handleVisibilty(element){
  if(showDiv.includes(element)){
    setShowDiv(showDiv.filter(item => item !== element))
  }
  else{
    setShowDiv([...showDiv,element])
  }
 }
  function cardClick(job) {
    navigate(`/jobDetails/${job?._id}`);
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
    <div className="outerDiv">
      <div className="innerDiv text-sm dark:text-darkColor-text p-6 sm:px-16">


        <div className="grid grid-cols-12 tracking-wide">

          <div className="col-span-2 font-medium text-end "><span className="cursor-pointer" onClick={()=>handleVisibilty("filter")}>Filter{showDiv.includes("filter")?<ArrowDropUpIcon/>:<ArrowDropDownIcon />}</span></div>
          {showDiv.includes("filter")&&<div className="col-span-10 grid grid-cols-12 gap-4 gap-y-2 sm:gap-6  sm:ml-4">
            <div className="col-span-6 sm:col-span-3 flex flex-col gap-1">
              <div>Experience</div>
              <select name="experience" id="experience" className="inputStyle" onChange={handleFitlerChange}>
                <option value={100} className="text-xs">All</option>
                <option value={0} className="text-xs"> Fresher / &lt; 1 year</option>
                <option value={1} className="text-xs">
                  1 year
                </option>

                {[...Array(49)].map((_, id) =>
                  <option key={id} value={id + 2} className="text-xs">
                    {id + 2} years
                  </option>
                )}
                </select>
            </div>
            <div className="col-span-6 sm:col-span-3 flex flex-col gap-1">
              <div>Salary</div>
              <select name="salary" id="salary" className="inputStyle" onChange={handleFitlerChange}>
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
              <select name="jobType" id="jobType" className="inputStyle" onChange={handleFitlerChange} >
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
              <select name="workModel" id="workModel" className="inputStyle" onChange={handleFitlerChange}>
                <option value="" className="text-xs">All</option>
                <option value="office" className="text-xs">Office</option>
                <option value="remote" className="text-xs">Remote</option>
                <option value="hybrid" className="text-xs">Hybrid</option>
                <option value="office,remote" className="text-xs">Both Office & Remote</option> 
                <option value="office,hybrid" className="text-xs">Both Office & Hybrid</option>
                <option value="hybrid,remote" className="text-xs">Both Office & Hybrid</option>
              </select>
            </div>
          </div>}

        </div>
        
        <div className="grid grid-cols-12 tracking-wide mt-4">

          <div className="font-medium col-span-2  text-end"><span className="cursor-pointer" onClick={() => handleVisibilty("sort")}>Sort{showDiv.includes("sort") ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span></div>
          {showDiv.includes("sort")&&<div className="col-span-10 grid grid-cols-12 gap-4 sm:gap-6  sm:ml-4">
            <div className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 flex flex-col gap-1">
              <select name="sortCriteria" id="sortCriteria" className="inputStyle" onChange={handleSortChange}>
                <option value="name" className="text-xs">Name</option>
                <option value="date" className="text-xs">Date Posted</option>
              </select>
            </div>

            <div className="col-span-6 sm:col-span-8 md:col-span-6 lg:col-span-4 flex flex-col gap-1">
              <select name="sortOrder" id="sortOrder" className="inputStyle" onChange={handleSortChange}>
                <option value="asc" className="text-xs">Ascending {sortData.sortCriteria==="name"?"(A-Z)":"(Oldest to Newest)"}</option>
                <option value="desc" className="text-xs">Descending {sortData.sortCriteria === "name"?"(Z-A)":"(Newest to Oldest)"}</option>
              </select>
            </div>

            

          </div>}

        </div>


      </div>
      <div className="innerDiv min-h-screen">
        {isLoading ? (
          <div className="p-6 md:px-28 lg:px-6 text-center">Loading...</div>
        ) : (
          <div className=" grid min-h-44 grid-cols-12 gap-4 p-6 px-16">
              {filteredJobs &&filteredJobs.length > 0 ? (
               filteredJobs.map((element, index) => (
                <div key={index} className="bg-white dark:bg-darkColor-input  col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 shadow-sm hover:shadow-md border border-borderColor rounded-md hover:border-brandColor-dark dark:hover:border-gray-200"> 
                
                <JobCardSm
                  element={element}
                  cardClick={cardClick}
                /></div>

              ))
            ) : (
              <div className="col-span-12 text-center">No jobs found, try another filtering</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
