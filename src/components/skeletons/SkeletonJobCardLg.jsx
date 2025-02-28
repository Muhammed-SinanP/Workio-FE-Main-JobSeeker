import React from "react";

const SkeletonJobCardLg = () => {
  return (
    <div className="skeleton max-h-full w-full flex-col overflow-hidden rounded-md">
      <div className="dark:bg-darkColor-input skeleton flex flex-col gap-2.5 rounded-b-none rounded-t-md p-4 pt-5">
        <div className="flex items-center justify-between gap-2">
          <div className="skeleton-custom-color h-10 w-80"></div>
          <div className="skeleton-custom-color h-8 w-6"></div>
        </div>
        <div className="flex gap-2">
          <div className="skeleton-custom-color h-6 w-36"></div>
          <div className="skeleton-custom-color h-6 w-36"></div>
        </div>
        <div className="skeleton-custom-color h-6 w-32"></div>
        <div className="skeleton-custom-color h-8 w-24"></div>
      </div>
      <div className="skeleton rounded-t-none p-4 dark:bg-gray-300">
        <div className="skeleton-custom-color h-4 w-60"></div>
        <div className="skeleton-custom-color mt-3 h-6 w-40"></div>
        <div className="my-2"></div>
        <div className="my-4 flex gap-2">
          <div className="skeleton-custom-color h-6 w-6"></div>
          <div>
            <div className="skeleton-custom-color h-6 w-36"></div>
            <div className="skeleton-custom-color mt-2 h-4 w-64 lg:w-96"></div>
            <div className="skeleton-custom-color mt-2 h-4 w-64 lg:w-96"></div>
          </div>
        </div>
        <div className="my-4 flex gap-2">
          <div className="w- skeleton-custom-color h-6"></div>
          <div>
            <div className="skeleton-custom-color h-6 w-36"></div>
            <div className="skeleton-custom-color mt-2 h-4 w-64 lg:w-96"></div>
            <div className="skeleton-custom-color mt-2 h-4 w-64 lg:w-96"></div>
          </div>
        </div>
        <div className="my-4 flex gap-2">
          <div className="skeleton-custom-color h-6 w-6"></div>
          <div>
            <div className="skeleton-custom-color h-6 w-36"></div>
            <div className="skeleton-custom-color mt-2 h-4 w-64 lg:w-96"></div>
          </div>
        </div>
        <div className="my-4 flex gap-2">
          <div className="skeleton-custom-color h-6 w-6"></div>
          <div>
            <div className="skeleton-custom-color h-6 w-36"></div>
            <div className="skeleton-custom-color mt-2 h-4 w-64 lg:w-96"></div>
          </div>
        </div>
        <div className="my-4 flex gap-2">
          <div className="skeleton-custom-color h-6 w-6"></div>
          <div>
            <div className="skeleton-custom-color h-6 w-36"></div>
            <div className="skeleton-custom-color mt-2 h-4 w-32"></div>
            <div className="skeleton-custom-color mt-2 h-4 w-32"></div>
            <div className="skeleton-custom-color mt-2 h-4 w-32"></div>
          </div>
        </div>
        <div className="my-4 flex gap-2">
          <div className="skeleton-custom-color h-6 w-6"></div>
          <div>
            <div className="skeleton-custom-color h-6 w-36"></div>
            <div className="skeleton-custom-color mt-2 h-4 w-32"></div>
          </div>
        </div>
        <div className="my-4 flex gap-2">
          <div className="skeleton-custom-color h-6 w-6"></div>
          <div>
            <div className="skeleton-custom-color h-6 w-36"></div>
            <div className="skeleton-custom-color mt-2 h-4 w-32"></div>
          </div>
        </div>

        <div className="my-6 mb-0 ml-1 flex items-center justify-between">
          <div className="skeleton-custom-color h-6 w-40"></div>
          <div className="skeleton-custom-color h-6 w-28"></div>
        </div>
        <div className="my-2"></div>
        <div className="my-2"></div>
        <div className="my-2"></div>
        <div className="my-2"></div>
        <div className="my-2"></div>
      </div>
    </div>
  );
};

export default SkeletonJobCardLg;
