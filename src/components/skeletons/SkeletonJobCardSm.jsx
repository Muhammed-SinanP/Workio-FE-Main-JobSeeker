import React from "react";

const SkeletonJobCardSm = () => {
  return (
    <div className="skeleton flex h-full w-full flex-col items-start gap-1.5 rounded-md p-3 pt-4 shadow-sm dark:bg-dark-input">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="skeleton-custom-color h-8 w-56"></div>
        <div className="skeleton-custom-color mb-1 mr-1 h-6 w-4"></div>
      </div>
      <div className="skeleton-custom-color h-6 w-32"></div>
      <div className="skeleton-custom-color h-4 w-40"></div>
      <div className="skeleton-custom-color h-4 w-40"></div>
      <div className="mb-3 flex gap-1">
        <div className="skeleton-custom-color h-4 w-12"></div>
        <div className="skeleton-custom-color h-4 w-12"></div>
      </div>

      <div className="skeleton-custom-color absolute bottom-2 right-2 h-2 w-24"></div>
    </div>
  );
};

export default SkeletonJobCardSm;
