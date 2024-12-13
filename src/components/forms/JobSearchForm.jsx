import React, { useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const JobSearchForm = ({setFilteredJobs ,setJobsFound,setSelectedCard}) => {
  const userLoggedIn = useSelector(state=>state.user.userLoggedIn)
  
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobExperience: "",
  });
 
  const [isJobLoading,setIsJobLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    
  }
  async function handleSubmit(e){
    e.preventDefault()
    if(userLoggedIn){
      setIsJobLoading(true)
      try {
       const response = await axiosInstance({
         url:"/job/search",
         method:"POST",
         data:formData,
       })
       if(response.status===200){
         setFilteredJobs(response?.data?.data)
         const initialJobId = response?.data?.data[0]?._id || ""
         setSelectedCard(initialJobId)
         if(initialJobId){
          setJobsFound(true)
          navigate(`/home/jobDetails/${initialJobId}`)
         }
         else{
          setJobsFound("empty")
          navigate("/")
         }
        
         setIsJobLoading(false)
         
         
       }
       else{
         console.log("status not 200")
         setIsJobLoading(false)
       }
       
   
      } catch (err) {
       console.log("err in filtereing",err.message)
       setIsJobLoading(false)
      }
    }
    else{
      toast.error("Login first")
      navigate("/sign/login")
    }
   
 
   }
  return (
    <form onSubmit={handleSubmit} className="rounded-md shadow-lg shadow-brandColor-dark dark:shadow-gray-100 dark:shadow-md flex flex-col md:flex-row items-center bg-white dark:bg-darkColor  p-2">
         <div className='flex items-center pl-1 text-xs w-full dark:bg-darkColor-input'> <SearchIcon/><input
            id="jobTitle"
            name="jobTitle"
            type="text"
            placeholder="job title"
            className="searchInput bg-white dark:bg-darkColor-input"
            onChange={handleChange}
            value={formData.jobTitle}
            required
          />
          </div>

          <div className='flex items-center pl-1 w-full text-xs dark:bg-darkColor-input'><LocationOnIcon/>
          <input
            id="jobLocation"
            name="jobLocation"
            type="text"
            placeholder="location"
            className="searchInput bg-white dark:bg-darkColor-input"
            onChange={handleChange}
            value={formData.jobLocation}
          />
          </div>
          <div className='flex items-center pl-1.5  w-full dark:bg-darkColor-input'>
            <WorkIcon/>
            
          <select
            id="jobExperience"
            name="jobExperience"
            className={`searchInput border-none text-xs cursor-pointer bg-white dark:bg-darkColor-input ${formData.jobExperience === ""? "text-[#9CA3AF]":"text-black dark:text-darkColor-text"}`}
            onChange={handleChange}
            value={formData.jobExperience}
            required
          >
            <option value="" disabled className="hidden " >
             Experience
            </option>
            <option value={0} className='text-xs '>Fresher/Less than 1year</option>
            <option value={1}  className='text-xs'>
              1 year
            </option>
            <option value={2} className='text-xs'>2 year</option>
            <option value={3} className='text-xs'>3 year</option>
          </select>
          </div>
          <div>
          <button  className="hidden md:block btn btn-square border-none ml-2  bg-brandColor hover:bg-brandColor-dark text-white" type='submit'>
          {isJobLoading? <span className="loading loading-spinner"></span>:<span>Find</span>} 
         </button>
         <button className=" md:hidden btn btn-wide btn-sm mt-2  bg-brandColor hover:bg-brandColor-dark text-white" type='submit'>
          {isJobLoading ?<span className='flex items-center gap-1'>Finding<span className="loading loading-spinner"></span></span>:<span>Find</span>} 
         </button>
          </div>
        </form>
  )
}

export default JobSearchForm