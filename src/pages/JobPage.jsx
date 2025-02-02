import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import JobCardSm from "../components/cards/JobCardSm";

const JobPage = () => {
  const navigate = useNavigate();
  const [jobs, error, isLoading] = useFetch("/job/allOpen");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(jobs);

  function cardClick(job) {
    navigate(`/jobDetails/${job?._id}`);
  }

  if (error) {
    return (
      <div className="pt-10 text-center">
        Error occured while fetching jobs..
      </div>
    );
  }

  return (
    <div className="outerDiv">
      <div className="innerDiv min-h-screen">
        {isLoading ? (
          <div className="p-6 md:px-28 lg:px-6 text-center">Loading...</div>
        ) : (
          <div className=" grid min-h-44 grid-cols-12 gap-4 p-6 px-16">
            {jobs && jobs.length > 0 ? (
              jobs.map((element, index) => (
                <div className="bg-white dark:bg-darkColor-input  col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 shadow-sm hover:shadow-md border border-borderColor rounded-md hover:border-brandColor-dark dark:hover:border-gray-200"> <JobCardSm
                  key={index}
                  element={element}
                  cardClick={cardClick}
                /></div>
               
              ))
            ) : (
              <div className="col-span-12 text-center">No jobs posted</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPage;
