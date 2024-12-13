import React from 'react'
import brandLogo from "../../assets/logo.png"
import { useNavigate } from 'react-router-dom';

import DarkModeBtn from '../buttons/DarkModeBtn';


const SignHeader = () => {
    const navigate = useNavigate()
    function navigateToEmployer(){
      window.open("https://workioforemployer.netlify.app/")
    }
    return (
        <div className="outerDiv z-40 rounded-b-md">

          <div className="  bg-white dark:bg-darkColor flex justify-between items-center px-4 pt-2 border-b-0.5 border-b-brandColor-dark   rounded-b-md ">
            <div className="flex mb-1">
              <div className="flex cursor-pointer mb-1"  onClick={()=>navigate("/")}>
                <img src={brandLogo} alt="" className="h-8" />
                <div className="font-brandFont text-brandColor text-2xl dark:text-darkColor-text">
                  Workio
                </div>
              </div>
              </div>
    
              
            
            <div className="flex justify-evenly gap-2 items-center mb-0">
              
            <div className='mb-0.5'><DarkModeBtn/></div>
              <div>
                <div className="border-r-0.5 border-black h-6 mb-1"></div>
              </div>
               
              <div onClick={navigateToEmployer} className="text-gray-700 dark:text-darkColor-text dark:hover:text-gray-200 cursor-pointer text-xs font-normal hover:text-gray-900 mb-1">
                Employer/Post Job
              </div>
            </div>
            
          </div>
    
         
           
    
        </div>
      );
}

export default SignHeader