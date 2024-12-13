import React, { useEffect, useState } from "react";

import JobSearchForm from "../components/forms/JobSearchForm";

import JobCardSm from "../components/cards/JobCardSm";
import { Outlet, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { userSuggestions } from "../components/Data";

const HomePage = () => {
  const navigate = useNavigate()
  const [jobsFound, setJobsFound] = useState(false);
  const [bottomCard,setBottomCard] = useState(false)
  
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [selectedCard,setSelectedCard]=useState("")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function cardClick(jobId){
    navigate(`/home/jobDetails/${jobId}`)
    setSelectedCard(jobId)
    setBottomCard(true)
   
     }

     function closeBottomCard(){
      setBottomCard(false)
      setSelectedCard("")
     }
  
  return (
    <div className="outerDiv ">
      <div className="bg-brandColor-lighter dark:bg-darkColor-light">
      <div
        className={`innerDiv  bg-brandColor-lighter dark:bg-darkColor-light transition-all duration-300 ease-in-out -mt-4 py-10  flex justify-center items-center ${
          jobsFound ? "md:py-10" : "md:py-32"
        }`}
      >
        <JobSearchForm
          setFilteredJobs={setFilteredJobs}
          setJobsFound={setJobsFound}
          setSelectedCard={setSelectedCard}
        />
      </div>
      </div>

     

      {jobsFound===true && <div className="innerDiv flex justify-center  p-4 pt-10 h-screen rounded-t-md -mt-2">
        <div className="w-4/5 sm:w-3/5 md:w-1/3 md:h-5/6 h-full flex flex-col gap-2 overflow-auto px-2 pb-2 scrollbar-hide  ">
          {filteredJobs &&
            filteredJobs.length > 0 &&
            filteredJobs.map((element, index) => (
              <JobCardSm key={index} element={element} selectedCard={selectedCard} cardClick={cardClick}/>
            ))}
        </div>
        <div className="w-2/3 h-5/6  2xl: px-2 hidden md:block">
        <Outlet/>
        </div>
      </div>}

      {jobsFound==="empty"&& <div className="text-center text-xs text-red-500 py-2">No jobs found for the given search criteria. Please try another query.</div> }

      {bottomCard&&<div className="md:hidden fixed z-20 bg-black opacity-50 right-0 top-0 h-screen w-full"></div> } 
      <div className={`md:hidden fixed h-screen right-0 bottom-0 w-full  z-30 flex flex-col transform ${bottomCard?"translate-y-0 ":"translate-y-full"} transition-all duration-200 ease-in-out`}>
        <div onClick={closeBottomCard} className=" right-0 top-0  w-full h-1/5 opacity-50 "></div>
        <div className=" relative  bg-white dark:bg-darkColor-light w-full h-4/5">
        <div onClick={closeBottomCard}  className="absolute right-2 top-2 cursor-pointer"><CloseIcon fontSize="small"/></div>
        <div className="px-8 pb-4 h-full pt-8"><Outlet/></div>
        </div>
      </div>
    
<div className=" dark:bg-darkColor-text ">
      <div className="innerDiv dark:bg-darkColor-text  pt-4 pb-10">
         <div className="p-4 px-8 md:px-10  xl:px-20 text-center font-bold text-xl lg:text-2xl  tracking-wide text-brandColor-dark dark:text-darkColor">Find the perfect job for YOU</div>
         <div className=" grid grid-cols-12  gap-4 md:gap-3 lg:gap-4 p-4 px-8 md:px-10 xl:gap-5 xl:px-20 pb-10">

          {userSuggestions.map((element,index)=>
          <div onClick={()=>window.open(element.link)} key={index} className="md:col-span-3 cursor-pointer sm:col-span-6 col-start-4 col-end-10 flex flex-col gap-1 items-center bg-white dark:bg-darkColor dark:shadow-gray-200 py-4 px-2 rounded-md shadow-md">
            <div><img src={element.img} alt={`${element.title} icon`} className="h-8" /></div>
            <div className="font-medium text-brandColor">{element.title}</div>
            <div className="text-xs">{element.subtitle}</div>
          </div>
          )}
          
          
         </div></div>
      </div>
    </div>
  );
};

export default HomePage;
