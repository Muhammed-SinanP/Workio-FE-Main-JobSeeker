// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useFetch from "../hooks/useFetch";
// import JobCardBig from "../components/cards/JobCardBig";

// const JobDetails = () => {
//   const [cardLoading, setCardLoading] = useState(true);
//   const params = useParams();
//   const jobId = params.jobId;

//   const [jobDetails, error, isLoading] = useFetch(`/job/${jobId}`);
//   useEffect(() => {
//     setCardLoading(true);
//   }, [jobId]);
//   useEffect(() => {
//     setCardLoading(false);
//   }, [jobDetails]);

//   console.log(jobDetails);

//   return (
//     <div className="h-full w-full rounded-md">
//       {isLoading || cardLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <JobCardBig job={jobDetails} />
//       )}
//     </div>
//   );
// };

// export default JobDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import JobCardBig from "../components/cards/JobCardBig";

const JobDetailsMain = () => {
  const [cardLoading, setCardLoading] = useState(true);
  const params = useParams();
  const jobId = params.jobId;

  const [jobDetails, error, isLoading] = useFetch(`/job/${jobId}`);
  useEffect(() => {
    setCardLoading(true);
  }, [jobId]);
  useEffect(() => {
    setCardLoading(false);
  }, [jobDetails]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="outerDiv min-h-screen -mt-2">
      <div className="innerDiv px-5 py-10 sm:px-10 lg:px-20">
        {isLoading || cardLoading ? (
          <div>Loading...</div>
        ) : (
          <JobCardBig job={jobDetails} />
        )}
      </div>
    </div>
  );
};

export default JobDetailsMain;