import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import JobCardBig from '../components/cards/JobCardBig'

const JobDetails = () => {
    const [cardLoading,setCardLoading] = useState(true)
    const params = useParams()
    const jobId = params.jobId
    

const [jobDetails,error,isLoading] = useFetch(`/job/${jobId}`)
    useEffect(()=>{
      setCardLoading(true)
    },[jobId])
    useEffect(()=>{
      setCardLoading(false)
    },[jobDetails])
    


console.log(jobDetails)


  return (
    
      <div className='w-full h-full rounded-md'>
      {isLoading || cardLoading ? <div>Loading...</div>:<JobCardBig job={jobDetails}/>}
      </div>
  )
}

export default JobDetails