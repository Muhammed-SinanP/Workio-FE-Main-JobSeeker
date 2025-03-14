import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import JobCardSm from "../../components/cards/JobCardSm";
import { useNavigate } from "react-router-dom";
import SkeletonJobCardSm from "../../components/skeletons/SkeletonJobCardSm";

const SavedJobsPage = () => {
  const navigate = useNavigate();

  const [limit, setLimit] = useState(12);
  const [refresh, setRefresh] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showBtn, setShowBtn] = useState(true);

  const [initialLoading, setInitialLoading] = useState(true);
  const [data, error, isLoading] = useFetch(
    `/user/mySavedJobs?limit=${limit}`,
    [refresh]
  );
  function cardClick(job) {
    navigate(`/jobDetails/${job?._id}`);
  }
  useEffect(() => {
    if (data) {
      setInitialLoading(false);
    }
    if (data?.savedJobs) {
      setSavedJobs([...data?.savedJobs]);
    }
  }, [data]);

  useEffect(() => {
    if (savedJobs && savedJobs.length === data?.savedJobsCount) {
      setShowBtn(false);
    } 
  }, [savedJobs])

  function handleLoadMore() {
    setLimit(limit + 12);
  }
  function refreshPage() {
    setRefresh(!refresh);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="outer-div min-h-screen pb-16">
      <div className="inner-div pb-0">

        <div className="mt-4 grid  grid-cols-12 gap-4 px-10">
          {initialLoading ? (
            Array.from({ length: limit }, (_, i) => (
              <div
                key={i}
                className="relative col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
              >
                <SkeletonJobCardSm />
              </div>
            ))
          ) : savedJobs && savedJobs.length > 0 && (
            savedJobs.map((element, index) => (
              <div
                key={index}
                className="col-span-12 rounded-md border border-custom-border-color bg-white shadow-sm hover:border-brand-dark hover:shadow-md sm:col-span-6 lg:col-span-4 xl:col-span-3 dark:bg-dark-input dark:hover:border-gray-200"
              >
                <JobCardSm
                  job={element?.job}
                  cardClick={cardClick}
                  savedJobs={savedJobs}
                  refreshPage={refreshPage}
                />
              </div>
            ))
          )

          }
        </div>

        {savedJobs && savedJobs.length === 0 && <div className="text-center dark:text-dark-text">
          Your saved list is empty. Go to{" "}
          <span
            onClick={() => navigate("/jobs")}
            className="cursor-pointer font-medium text-blue-500 underline"
          >
            jobs page
          </span>
          {" "}or <span
            onClick={() => navigate("/")}
            className="cursor-pointer font-medium text-blue-500 underline"
          >search jobs</span> to add jobs to saved list.

        </div>
        }

      </div>



      <div className="flex w-full justify-center">
        {showBtn && !initialLoading && (
          <button
            onClick={handleLoadMore}
            className="btn btn-sm my-10 bg-brand tracking-wide text-white hover:bg-brand-dark active:bg-brand-dark"
          >
            {isLoading ? "Loading ..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SavedJobsPage;
