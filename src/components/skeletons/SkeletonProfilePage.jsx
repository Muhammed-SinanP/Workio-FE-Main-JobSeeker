import React from "react";

const SkeletonProfilePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="skeleton h-32 rounded-md shadow-md"></div>
      <div className="skeleton rounded-md shadow-md">
        <div className="h-96"></div>
        <div className="h-16"></div>
      </div>
      <div className="skeleton h-8 w-28 rounded-md"></div>
    </div>
  );
};

export default SkeletonProfilePage;
