import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import JobCardSm from '../components/cards/JobCardSm'
import { useNavigate } from 'react-router-dom'
import SkeletonJobCardSm from '../components/skeletons/SkeletonJobCardSm'

const SaveListPage = () => {
  const navigate = useNavigate()
  
  const [limit,setLimit] = useState(12)
  const [refresh,setRefresh] = useState(false)
  const [savedJobs,setSavedJobs] = useState([])
  const [showBtn,setShowBtn] = useState(true)
  
  const [initialLoading,setInitialLoading] = useState(true)
  const [data,error,isLoading] = useFetch(`/user/saveList?limit=${limit}`,[refresh])
  function cardClick(job) {
    navigate(`/jobDetails/${job?._id}`);
  }
  useEffect(()=>{
   
    if(data?.savedJobs&&data?.savedJobs.length>0){
     
      setSavedJobs(
      [...data?.savedJobs]
      )
    }
   
  },[data])
  useEffect(()=>{
    if (savedJobs && savedJobs.length > 0) {
      setInitialLoading(false)
    }
    if(savedJobs && savedJobs.length === data?.savedJobsCount){
     setShowBtn(false)
    }
  },[savedJobs])

  function handleLoadMore(){
    setLimit(limit+12)
  }
  function refreshPage(){
    setRefresh(!refresh)
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='outerDiv min-h-screen'>
     <div className='innerDiv pb-0'>
        
         <div className=" grid min-h-44 grid-cols-12 gap-4 px-10  mt-4">

          {initialLoading? 
          
            (
              Array.from({ length: limit }, (_, i) =>

                <div key={i} className=" relative  col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 ">

                  <SkeletonJobCardSm />
                </div>)
            )
          :
          savedJobs && savedJobs.length > 0 ? savedJobs.map((element, index) =>
            <div key={index} className="bg-white dark:bg-darkColor-input  col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 shadow-sm hover:shadow-md border border-borderColor rounded-md hover:border-brandColor-dark dark:hover:border-gray-200">
              <JobCardSm job={element?.job}  cardClick={cardClick} savedJobs={savedJobs} refreshPage={refreshPage}/>
            </div>
          )
          :
          <div className='col-span-12 text-center'>Your saved list is empty. Go to <span onClick={()=>navigate("/jobs")} className='cursor-pointer font-medium text-blue-500 underline'>jobs page</span>.</div>
        }
         </div>
     </div>

      <div className="w-full flex justify-center">
        {showBtn && <button onClick={handleLoadMore} className='my-10 btn btn-sm bg-brandColor hover:bg-brandColor-dark active:bg-brandColor-dark text-white tracking-wide'>{isLoading?"Loading ...":"Load more"}</button>}
      </div>
      
    </div>
  )
}

export default SaveListPage;