import React, { useEffect, useState } from "react";
import JobSearchForm from "../components/forms/JobSearchForm";
import JobCardSm from "../components/cards/JobCardSm";
import CloseIcon from "@mui/icons-material/Close";
import JobCardLg from "../components/cards/JobCardLg";
import useFetch from "../hooks/useFetch";
import ArticleSuggestions from "../components/ArticleSuggestions";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userLoggedIn } = useSelector((state) => state.user);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bottomCard, setBottomCard] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [refreshSavedJobs, setRefreshSavedJobs] = useState(false);
  const [refreshCardLg, setRefreshCardLg] = useState(false);

  const [savedData, savedError, savedLoading] = useFetch(
    userLoggedIn ? "/user/mySavedJobs" : null,
    [refreshSavedJobs],
  );

  useEffect(() => {
    savedData && setSavedJobs(savedData.savedJobs);
  }, [savedData]);

  function refreshPage(job) {
    if (selectedJob._id === job._id) {
      setRefreshCardLg(!refreshCardLg);
      setRefreshSavedJobs(!refreshSavedJobs);
    } else {
      setRefreshSavedJobs(!refreshSavedJobs);
    }
  }

  function handleCardClick(job) {
    setSelectedJob(job);
    window.innerWidth < 768 && setBottomCard(true);
  }

  function closeBottomCard() {
    setBottomCard(false);
  }

  useEffect(() => {
    if (bottomCard && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [bottomCard]);

  return (
    <main className="page-div dark:bg-dark-text">
      <div className="dark:to-dark-light bg-gradient-to-t from-green-50 to-brand-light dark:from-dark-text">
        <div
          className={`inner-div -mt-4 flex flex-col items-center justify-center gap-4 py-10 transition-all duration-500 ease-in-out ${filteredJobs && filteredJobs.length > 0 ? "md:py-10" : "md:py-32"}`}
        >
          <JobSearchForm
            filteredJobs={filteredJobs}
            setFilteredJobs={setFilteredJobs}
            setSelectedJob={setSelectedJob}
          />

          <div
            className={`${!filteredJobs ? "visible" : "invisible"} ${filteredJobs && filteredJobs.length > 0 && "hidden"} px-6 pt-2 text-center text-sm  tracking-wide text-red-800 `}
          >
            No jobs found for the given search criteria. Please try another
            query!
          </div>
        </div>

        {filteredJobs && filteredJobs.length > 0 && (
          <div className="inner-div flex h-screen justify-center p-4 pt-0">
            <div className="custom-scrollbar flex h-full w-4/5 flex-col gap-0 overflow-y-scroll pb-2 sm:w-3/5 md:h-5/6 md:w-1/3">
              {filteredJobs &&
                filteredJobs.length > 0 &&
                filteredJobs.map((element, index) => (
                  <div
                    key={index}
                    className={`duration-800 rounded-md border bg-white shadow-sm dark:bg-dark-input ${selectedJob === element ? "scale-90 border shadow-sm shadow-brand-dark sm:scale-95 md:border-brand-dark dark:border-gray-200 dark:shadow-dark-text" : "scale-90 border-custom-border-color"} hover:border-brand-dark dark:hover:border-gray-200`}
                  >
                    <JobCardSm
                      job={element}
                      handleCardClick={handleCardClick}
                      savedJobs={savedJobs}
                      refreshPage={refreshPage}
                    />
                  </div>
                ))}
              <span className="text-center text-xxs tracking-wide text-dark-light">
                End of the results.
              </span>
            </div>
            <div className="2xl: hidden h-5/6 w-2/3 px-2 md:block">
              {selectedJob && (
                <JobCardLg
                  jobId={selectedJob?._id}
                  refreshPage={refreshPage}
                  refreshCardLg={refreshCardLg}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {bottomCard && (
        <div className="fixed right-0 top-0 z-20 h-screen w-full bg-black opacity-50 md:hidden"></div>
      )}

      <div
        className={`fixed bottom-0 right-0 z-30 flex h-screen w-full transform flex-col md:hidden ${bottomCard ? "translate-y-0" : "translate-y-full"} transition-all duration-200 ease-in-out`}
      >
        <div
          onClick={closeBottomCard}
          className="right-0 top-0 h-1/5 w-full opacity-50"
        ></div>
        <div className="relative h-4/5 w-full bg-white dark:bg-dark-light">
          <div
            onClick={closeBottomCard}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <CloseIcon />
          </div>
          <div className="h-full px-8 pb-6 pt-10">
            {selectedJob && (
              <JobCardLg
                jobId={selectedJob?._id}
                refreshPage={refreshPage}
                refreshCardLg={refreshCardLg}
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-brand-extralight dark:bg-dark-text">
        <ArticleSuggestions />
      </div>
    </main>
  );
};

export default HomePage;
