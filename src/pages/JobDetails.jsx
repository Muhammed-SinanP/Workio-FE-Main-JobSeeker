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

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import toast from "react-hot-toast";
import SkeletonJobCardLg from "../components/skeletons/SkeletonJobCardLg";
import JobCardLg from "../components/cards/JobCardLg";
import { axiosInstance } from "../config/axiosInstance";

const JobDetailsMain = () => {

  const params = useParams();
  const jobId = params.jobId;
  const [refresh, setRefresh] = useState(false)
  const [refreshCardLg, setRefreshCardLg] = useState(null)
  const timeoutRef = useRef(null)

  // const [jobDetails, error, isLoading] =  useFetch(`/job/${jobId}`);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSave(e, job) {
     toast.dismiss()
    e.stopPropagation()
    const toastLoading = toast.loading('Loading...');
    if (timeoutRef.current) {
      
      clearTimeout(timeoutRef.current)
    }
    const jobId = job?._id;
    try {
      const response = await axiosInstance({
        url: "/job/handleSave",
        method: "POST",
        data: { jobId }
      })
      if (response.status === 201) {
        setRefreshCardLg(!refreshCardLg)
        timeoutRef.current = setTimeout(() => {
          toast.dismiss(toastLoading);
          toast.success("Saved")
        }, 1000);


      } else if (response.status === 200) {
        setRefreshCardLg(!refreshCardLg)
        timeoutRef.current = setTimeout(() => {
          toast.dismiss(toastLoading);
          toast.success("Unsaved")
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }

  }

  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  return (
    <div className="outerDiv min-h-screen -mt-2">
      <div className="innerDiv px-5 py-10 sm:px-10 lg:px-20">
        {/* {isLoading ? (
          <SkeletonJobCardLg/>
        ) : ( */}
        <JobCardLg jobId={jobId} handleSave={handleSave} refresh={refreshCardLg} />
        {/* )} */}
      </div>
    </div>
  );
};

export default JobDetailsMain;