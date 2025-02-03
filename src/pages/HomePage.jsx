import React, { useEffect, useState } from "react";

import JobSearchForm from "../components/forms/JobSearchForm";

import JobCardSm from "../components/cards/JobCardSm";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { userSuggestions } from "../components/Data";
import JobCardBig from "../components/cards/JobCardBig";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [bottomCard, setBottomCard] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function cardClick(job) {
    setSelectedJob(null)
    setTimeout(() => setSelectedJob(job),200)
    
    setBottomCard(true);
  }

  function closeBottomCard() {
    setBottomCard(false);

  }

  return (
    <div className="outerDiv">
      <div className="bg-brandColor-lighter dark:bg-darkColor-light">
        <div
          className={`innerDiv -mt-4 flex flex-col items-center justify-center gap-4 py-10 transition-all duration-500 ease-in-out ${filteredJobs && filteredJobs.length > 0 ? "md:py-10" : "md:py-32"
            }`}
        >
          <JobSearchForm
          filteredJobs={filteredJobs}
            setFilteredJobs={setFilteredJobs}
            setSelectedJob={setSelectedJob}
          />

          <div
            className={`${!filteredJobs ? "visible" : "invisible"} ${filteredJobs && filteredJobs.length > 0 && "hidden"} pt-2 text-center text-sm font-medium tracking-wide text-red-500`}
          >
            No jobs found for the given search criteria. Please try another
            query !
          </div>
        </div>

        {filteredJobs && filteredJobs.length > 0 && (
          <div className="innerDiv flex h-screen justify-center p-4 pt-0">
            <div className="flex h-full w-4/5 flex-col gap-0 overflow-auto  pb-2 scrollbar-hide sm:w-3/5 md:h-5/6 md:w-1/3">
              <div className="text-center text-xs text-gray-600 dark:text-darkColor-text pb-1 tracking-wide">
                Scroll here to see all the results.
              </div>
              {filteredJobs &&
                filteredJobs.length > 0 &&
                filteredJobs.map((element, index) => (
                  <div className={`border duration-800 rounded-md bg-white dark:bg-darkColor-input shadow-sm ${selectedJob === element ? "scale-95 shadow-sm border md:border-brandColor-dark shadow-brandColor-dark dark:shadow-darkColor-text dark:border-gray-200" : "scale-90 border-borderColor"} hover:border-brandColor-dark dark:hover:border-gray-200 `}>
                    <JobCardSm
                      key={index}
                      element={element}
                      cardClick={cardClick}
                    /></div>
                ))}
              <div className="text-center text-xs text-gray-600 dark:text-darkColor-text tracking-wide">
                You have reached the end of the results.
              </div>
            </div>
            <div className="2xl: hidden h-5/6 w-2/3 px-2 md:block">
              
              {selectedJob ? <JobCardBig job={selectedJob}/>: <div>Loading...</div>}
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
        <div className="relative h-4/5 w-full bg-white dark:bg-darkColor-light">
          <div
            onClick={closeBottomCard}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <CloseIcon />
          </div>
          <div className="h-full px-8 pb-6 pt-10">
            {selectedJob&&<JobCardBig job={selectedJob}/>}
          </div>
        </div>
      </div>


      <div className="innerDiv pb-10 pt-4 dark:bg-darkColor-text rounded-t-lg bg-brandColor-lightest -mt-2">
        <div className="p-4 px-8 text-center text-xl font-bold tracking-wide text-brandColor md:px-10 lg:text-2xl xl:px-20 dark:text-darkColor">
          Find the perfect job for <span className="uppercase text-brandColor-dark dark:text-brandColor">you</span>
        </div>
        <div className="grid grid-cols-12 gap-4 p-4 px-8 pb-10 md:gap-3 md:px-10 lg:gap-4 xl:gap-5 xl:px-20">
          {userSuggestions.map((element, index) => (
            <div
              onClick={() => window.open(element.link)}
              key={index}
              className="col-start-4 hover:scale-95 active:scale-90 scale-90 transition-all ease-in-out duration-500 px-2 py-6 col-end-10 flex cursor-pointer flex-col items-center gap-1 rounded-md bg-white  shadow-md  sm:col-span-6 md:col-span-3 dark:bg-darkColor dark:shadow-darkColor-input"
            >
              <div>
                <img
                  src={element.img}
                  alt={`${element.title} icon`}
                  className="h-8"
                />
              </div>
              <div className="font-medium text-brandColor">
                {element.title}
              </div>
              <div className="text-center text-xs dark:text-darkColor-text">{element.subtitle}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
