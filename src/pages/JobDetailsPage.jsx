import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCardLg from "../components/cards/JobCardLg";

const JobDetailsPage = () => {
  const params = useParams();
  const jobId = params.jobId;

  const [refreshCardLg, setRefreshCardLg] = useState(null);

  function refreshPage() {
    setRefreshCardLg(!refreshCardLg);
  }

  return (
    <div className="page-div">
      <div className="inner-div h-screen sm:px-10 lg:px-20 2xl:h-auto">
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
