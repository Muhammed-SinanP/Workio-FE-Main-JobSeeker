import React, { useEffect, useRef, useState } from "react";

import JobSearchForm from "../components/forms/JobSearchForm";

import JobCardSm from "../components/cards/JobCardSm";
import {  useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { userSuggestions } from "../components/Data";
import JobCardLg from "../components/cards/JobCardLg";
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonJobCardLg from "../components/skeletons/SkeletonJobCardLg";
import useFetch from "../hooks/useFetch";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false)
  const [refreshCardLg,setRefreshCardLg] = useState(false)
  const [savedData, error, loading] = useFetch("/user/saveList",[refresh])
  const [savedJobs,setSavedJobs] = useState([])
  const [bottomCard, setBottomCard] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const timeoutRef = useRef(null)

  
  useEffect(()=>{
   savedData && setSavedJobs(savedData?.savedJobs)
  },[savedData])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  function refreshPage(job) {
    if(selectedJob === job){
      setRefresh(!refresh)
      setRefreshCardLg(!refreshCardLg)
    }
    else{
      setRefresh(!refresh)
      
    }
    
    // // setSelectedJob(null)
    // if (timeoutRef.current) {
    //   clearTimeout(timeoutRef.current)
    // }

    // timeoutRef.current = setTimeout(() => {
    //   setSelectedJob(job)
    //   timeoutRef.current = null
    // }, 1)
    
    
  }

  function cardClick(job) {
    setRefreshCardLg(!refreshCardLg)
    setSelectedJob(job)
    setBottomCard(true);
  }

  function closeBottomCard() {
    setBottomCard(false);

  }

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
        setRefresh(!refresh)
        setRefreshCardLg(!refreshCardLg)
        timeoutRef.current = setTimeout(() => {
          toast.dismiss(toastLoading);
          toast.success("Saved")
        }, 1000);

      } else if (response.status === 200) {
        
        setRefresh(!refresh)
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

  return (
    <div className="outerDiv">
      <div className="bg-gradient-to-t from-green-50 to-brandColor-lighter dark:from-darkColor-text dark:to-bg-darkColor-light">
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
            className={`${!filteredJobs ? "visible" : "invisible"} ${filteredJobs && filteredJobs.length > 0 && "hidden"} px-6 pt-2 text-center text-sm font-medium tracking-wide text-red-500`}
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
                  <div key={index} className={`border duration-800 rounded-md bg-white dark:bg-darkColor-input shadow-sm ${selectedJob === element ? "sm:scale-95 scale-90 shadow-sm border md:border-brandColor-dark shadow-brandColor-dark dark:shadow-darkColor-text dark:border-gray-200" : "scale-90 border-borderColor"} hover:border-brandColor-dark dark:hover:border-gray-200 `}>
                    <JobCardSm
                      
                      job={element}
                      cardClick={cardClick}
                      savedJobs={savedJobs}
                      refreshPage={refreshPage}
                    /></div>
                ))}
              
              <div className="text-center text-xs mt-2 text-gray-600 dark:text-darkColor-text tracking-wide">
                You have reached the end of the results.
              </div>
            </div>
            <div className="2xl: hidden h-5/6 w-2/3 px-2 md:block">
              
              {selectedJob ? <JobCardLg jobId={selectedJob?._id} refresh={refreshCardLg} handleSave={handleSave}/> : <div className="w-full h-full flex justify-center items-center"><span className="loading bg-brandColor-dark  loading-bars w-32 h-32"></span></div>}
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
            {selectedJob && <JobCardLg jobId={selectedJob?._id} refresh={refreshCardLg} handleSave={handleSave} />}
          </div>
        </div>
      </div>

      <div className="outerDiv dark:bg-darkColor-text  bg-brandColor-lightest ">
        <div className="innerDiv pb-10 pt-4  ">
        <div className="p-4 px-8 text-center text-xl font-bold tracking-wide text-brandColor md:px-10 lg:text-2xl xl:px-20 dark:text-darkColor">
          Find the perfect job for <span className="uppercase text-brandColor-dark dark:text-brandColor">you</span>
        </div>
        <div className="grid sm:mt-6 mt-0 grid-cols-12  md:px-8 lg:px-10 xl:px-20 gap-2 gap-x-1 sm:gap-4 sm:gap-x-0   pb-10 md:gap-3  lg:gap-4 xl:gap-5 ">
          {userSuggestions.map((element, index) => (
            <div
              onClick={() => window.open(element.link)}
              key={index}
              className=" hover:scale-95 active:scale-90 scale-90 transition-all ease-in-out duration-500 px-2 py-6  flex cursor-pointer flex-col items-center gap-2 rounded-md bg-white  shadow-md  col-span-6 md:col-span-3 dark:bg-darkColor dark:shadow-darkColor-input"
            >
              <div>
                <img
                  src={element.img}
                  alt={`${element.title} icon`}
                  className="h-8"
                />
              </div>
              <div className="font-medium text-brandColor text-lg">
                {element.title}
              </div>
              <div className="text-center text-sm dark:text-darkColor-text tracking-wide">{element.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
      </div>

    </div>
  );
};

export default HomePage;
