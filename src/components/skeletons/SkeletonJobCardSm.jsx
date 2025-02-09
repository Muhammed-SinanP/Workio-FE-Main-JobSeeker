import React from 'react'

const SkeletonJobCardSm = () => {
    return (
        <div className="w-full h-full skeleton shadow-sm rounded-md flex flex-col gap-1.5 items-start p-3 pt-4 ">
            <div className="flex justify-between items-center w-full">
                <div className="skeleton h-8 w-56 bg-gray-300"></div>
                <div className="skeleton h-6 w-4 bg-gray-300 mb-1 mr-1"></div>
            </div>
            <div className="skeleton h-6 w-32 bg-gray-300"></div>
            <div className="skeleton h-4 w-40 bg-gray-300"></div>
            <div className="skeleton h-4 w-40 bg-gray-300"></div>
            <div className="flex gap-1 mb-3">
                <div className="skeleton h-4 w-12 bg-gray-300"></div>
                <div className="skeleton h-4 w-12 bg-gray-300"></div>
            </div>

            <div className="skeleton absolute right-2 bottom-2 h-2 w-24 bg-gray-300"></div>
        </div>
    )
}

export default SkeletonJobCardSm