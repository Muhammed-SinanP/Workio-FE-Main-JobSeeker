import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const JobCardSm = ({ element, cardClick }) => {
  
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

  

  return (
    <>
      <div
        onClick={() => cardClick(element)}
        className={`relative border border-white  w-full h-full group flex cursor-pointer flex-col items-start gap-1 rounded-md  bg-white p-3  dark:border-darkColor-input dark:bg-darkColor-input dark:text-darkColor-text `}
      >
        <div className="flex w-full justify-between gap-2.5">
          <div className="text-lg group-hover:underline font-semibold capitalize text-brandColor-dark dark:text-brandColor">
            {element.title}
          </div>
          <div className="text-brandColor-dark dark:text-brandColor">
            <BookmarkBorderIcon fontSize="small" />
          </div>
        </div>
        <div className="text-sm capitalize">{element.employer?.name}</div>
        <div className="flex items-center text-xs">
          <LocationOnIcon fontSize="small" className="-ml-1 px-0 py-1" />
          {element.location?.city}, {element.location?.state},{" "}
          {element.location?.country}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center">
            <WorkIcon fontSize="small" className="-ml-1 px-0 py-1" />
            {element.minExperience}+ years
          </div>
          <div className="h-3/5 border-r-0.5 border-darkColor-text"></div>
          <div className="-ml-1 flex items-center rounded-sm pr-1">
            <CurrencyRupeeIcon fontSize="small" className="-mr-1 px-0 py-1" />
            {element.sallaryRange?.min}-{element.sallaryRange?.max}{" "}
            <span className="ml-1 font-light">LPA</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-medium mb-4">
          <div className="rounded-sm bg-gray-200 px-1 py-0.5 dark:bg-darkColor-light">
            {element.jobType}
          </div>
          <div className="rounded-sm bg-gray-200 px-1 py-0.5 dark:bg-darkColor-light">
            {element.workModel}
          </div>
        </div>
        <div className="mt-1 w-full text-end text-xs absolute bottom-2 right-2">
          Posted {calculateDays(element.createdAt)}
        </div>
      </div>
    </>
  );
};

export default JobCardSm;
