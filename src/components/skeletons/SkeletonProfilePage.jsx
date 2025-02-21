import React from 'react'

const SkeletonProfilePage = () => {
  return (
      <div className="flex flex-col gap-4">
          <div className="skeleton rounded-md shadow-md h-32"></div>
          <div className="skeleton rounded-md shadow-md ">
              <div className="h-96"></div>
              <div className="h-16"></div>
          </div>
          <div className="skeleton rounded-md h-8 w-28"></div>
      </div>
  )
}

export default SkeletonProfilePage