import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCardLg from "../../components/cards/JobCardLg";


const JobDetailsPage = () => {
  const params = useParams();
  const jobId = params.jobId;

  const [refreshCardLg, setRefreshCardLg] = useState(null);
  
  function refreshPage(){
    setRefreshCardLg(!refreshCardLg)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="outer-div h-screen">
      <div className="inner-div h-screen 2xl:h-auto sm:px-10 lg:px-20">
        <JobCardLg
          jobId={jobId}
          refreshPage={refreshPage}
          refreshCardLg={refreshCardLg}
        />
      </div>
    </div>
  );
};

export default JobDetailsPage;
