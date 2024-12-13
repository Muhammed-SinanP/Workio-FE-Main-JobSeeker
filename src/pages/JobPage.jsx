import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import useFetch from "../hooks/useFetch";

import JobCardSm from "../components/cards/JobCardSm";

const JobPage = () => {
  const navigate = useNavigate()
  const [jobs, error, isLoading] = useFetch("/job/allOpen");

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  console.log(jobs)

  function cardClick(jobId){
    navigate(`/jobDetails/${jobId}`)

  }

  return (
    <div className="outerDiv">
      <div className="innerDiv min-h-screen ">
        {isLoading ? (
          <div className="lg:px-6 md:px-28 p-6">Loading...</div>
        ) : (
          <div className="lg:px-6 md:px-28 p-6 grid grid-cols-12  gap-4  min-h-44 ">
            {jobs &&
              jobs.length > 0 &&
              jobs.map((element, index) => (
                
                <JobCardSm key={index} element={element} cardClick={cardClick}/>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPage;
