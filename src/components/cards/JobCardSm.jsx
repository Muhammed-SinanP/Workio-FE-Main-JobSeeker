import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";


const JobCardSm = ({ element,selectedCard,cardClick }) => {
  
  const descriptionLength = 100;
  function calculateDays(date) {
    const createdDate = new Date(date);
    const currentDate = new Date();
    createdDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    const msDifference = currentDate - createdDate;
    const dateDiffernce = Math.floor(msDifference / (1000 * 60 * 60 * 24));

    if (dateDiffernce === 0) {
      return "today";
    }
    if (dateDiffernce === 1) {
      return "yesterday";
    }
    return `${dateDiffernce} days ago`;
  }

  function trimDescription(text) {
    if (text && text.length > descriptionLength) {
      return `${text.slice(0, descriptionLength)}...`;
    } else {
      return text;
    }
  }

 
  
  return (
    <>
    
    <div onClick={()=>cardClick(element._id)} className={`border ${selectedCard===element._id ? "md:border-brandColor-dark dark:md:border-darkColor-text dark:md:shadow-gray-200  md:shadow-brandColor-dark":"border-gray-400 "}   flex flex-col gap-1.5 items-start p-3 rounded-md border shadow-sm cursor-pointer hover:shadow-sm hover:border-brandColor-dark dark:hover:border-gray-200 hover:shadow-brandColor-dark dark:hover:shadow-gray-200 xl:col-span-3 lg:col-span-4 md:col-span-6   bg-white dark:bg-darkColor col-start-3 col-end-11 `}>
      <div className="uppercase font-semibold text-lg text-brandColor-dark dark:text-brandColor">
        {element.title}
      </div>
      <div className="text-sm capitalize">{element.employer?.name}</div>
      <div className="text-xs flex items-center">
        <LocationOnIcon fontSize="small" className="py-1 px-0 -ml-1" />
        {element.location?.city}, {element.location?.state},{" "}
        {element.location?.country}
      </div>
      <div className="text-xs flex items-center gap-2">
        <div className="flex items-center">
          <WorkIcon fontSize="small" className="py-1 px-0 -ml-1" />
          {element.minExperience}+ years
        </div>
        <div className="border-r h-full"></div>
        <div className="flex items-center -ml-1 pr-1 rounded-sm">
          <CurrencyRupeeIcon fontSize="small" className="py-1 px-0 -mr-1" />
          {element.sallaryRange?.min}-{element.sallaryRange?.max} <span className="font-light ml-1">LPA</span>
        </div>
      </div>

      <div className="flex items-center font-medium gap-1 text-xs">
        <div className="bg-gray-200 dark:bg-darkColor-light p-1 rounded-sm">{element.jobType}</div>
        <div className="bg-gray-200 dark:bg-darkColor-light p-1 rounded-sm">{element.workModel}</div>
      </div>
      <div className="text-xs">{trimDescription(element.description)}</div>
      <div className="w-full text-xs text-end">
        Posted {calculateDays(element.createdAt)}
      </div>
    </div>
    
    </>
  );
};

export default JobCardSm;


