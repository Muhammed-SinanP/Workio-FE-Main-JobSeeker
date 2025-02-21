import React from 'react'

const SkeletonJobCardLg = () => {
    return (

        <div className='w-full max-h-full overflow-hidden flex-col rounded-md  skeleton'>
            <div className='flex flex-col gap-2.5 p-4 pt-5 skeleton dark:bg-darkColor-input  rounded-t-md rounded-b-none'>
                <div className='flex justify-between gap-2 items-center'>
                    <div className='h-10 w-80 skeleton-custom-color '></div>
                    <div className='h-8 w-6  skeleton-custom-color'></div>
                    </div>
                <div className='flex gap-2'>
                    <div className='h-6 w-36 skeleton-custom-color'></div>
                    <div className='h-6 w-36 skeleton-custom-color '></div>
                </div>
                <div className='w-32 h-6 skeleton-custom-color '></div>
                <div className='w-24 h-8 skeleton-custom-color '></div>
            </div>
            <div className='skeleton dark:bg-gray-300 p-4 rounded-t-none'>
                  <div className='h-4 w-60  skeleton-custom-color '></div>
                <div className='h-6 w-40 skeleton-custom-color  mt-3'></div>
                <div className="my-2 ">

                </div>
                <div className="my-4 flex gap-2">
                    <div className='h-6 w-6 skeleton-custom-color '></div>
                    <div>
                        <div className='w-36 h-6 skeleton-custom-color '></div>
                        <div className='h-4 w-96 skeleton-custom-color  mt-2'></div>
                        <div className='h-4 w-96  skeleton-custom-color mt-2'></div>
                    </div>
                </div>
                <div className="my-4 flex gap-2">
                    <div className='h-6 w- skeleton-custom-color '></div>
                    <div>
                        <div className='w-36 h-6 skeleton-custom-color '></div>
                        <div className='h-4 w-96  skeleton-custom-color mt-2'></div>
                        <div className='h-4 w-96 skeleton-custom-color  mt-2'></div>
                    </div>
                </div>
                <div className="my-4 flex gap-2">
                    <div className='h-6 w-6 skeleton-custom-color '></div>
                    <div>
                        <div className='w-36 h-6 skeleton-custom-color '></div>
                        <div className='h-4 w-96 skeleton-custom-color  mt-2'></div>
                    </div>
                </div>
                <div className="my-4 flex gap-2">
                    <div className='h-6 w-6 skeleton-custom-color '></div>
                    <div>
                        <div className='w-36 h-6 skeleton-custom-color '></div>
                        <div className='h-4 w-96 skeleton-custom-color  mt-2'></div>
                    </div>
                </div>
                <div className="my-4 flex gap-2">
                    <div className='h-6 w-6 skeleton-custom-color '></div>
                    <div>
                        <div className='w-36 h-6 skeleton-custom-color '></div>
                        <div className='h-4 w-32 skeleton-custom-color  mt-2'></div>
                        <div className='h-4 w-32  skeleton-custom-color mt-2'></div>
                        <div className='h-4 w-32 skeleton-custom-color  mt-2'></div>
                    </div>
                </div>
                <div className="my-4 flex gap-2">
                    <div className='h-6 w-6 skeleton-custom-color '></div>
                    <div>
                        <div className='w-36 h-6 skeleton-custom-color '></div>
                        <div className='h-4 w-32 skeleton-custom-color  mt-2'></div>
                    </div>
                </div>
                <div className="my-4 flex gap-2">
                    <div className='h-6 w-6 skeleton-custom-color '></div>
                    <div>
                        <div className='w-36 h-6 skeleton-custom-color '></div>
                        <div className='h-4 w-32 skeleton-custom-color  mt-2'></div>
                    </div>
                </div>
                
                <div className="my-6 mb-0 ml-1 flex justify-between items-center">
                    <div className='h-6 w-40 skeleton-custom-color '></div>
                    <div className='h-6 w-28 skeleton-custom-color '></div>
                </div>
                <div className="my-2 "></div>
                <div className="my-2 "></div>
                <div className="my-2 "></div>
                <div className="my-2 "></div>
                <div className="my-2 "></div>
            </div>
        </div>
    )
}

export default SkeletonJobCardLg