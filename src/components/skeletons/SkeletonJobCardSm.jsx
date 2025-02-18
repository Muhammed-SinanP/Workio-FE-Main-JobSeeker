import React from 'react'

const SkeletonJobCardSm = () => {
    return (
        <div className="w-full h-full skeleton dark:bg-darkColor-input shadow-sm rounded-md flex flex-col gap-1.5 items-start p-3 pt-4 ">
            <div className="flex justify-between gap-2 items-center w-full">
                <div className="skeleton-custom-color h-8 w-56 "></div>
                <div className="skeleton-custom-color h-6 w-4  mb-1 mr-1"></div>
            </div>
            <div className="skeleton-custom-color h-6 w-32 "></div>
            <div className="skeleton-custom-color h-4 w-40 "></div>
            <div className="skeleton-custom-color h-4 w-40 "></div>
            <div className="flex gap-1 mb-3">
                <div className="skeleton-custom-color h-4 w-12 "></div>
                <div className="skeleton-custom-color h-4 w-12 "></div>
            </div>

            <div className="skeleton-custom-color absolute right-2 bottom-2  h-2 w-24 "></div>
        </div>
    )
}

export default SkeletonJobCardSm