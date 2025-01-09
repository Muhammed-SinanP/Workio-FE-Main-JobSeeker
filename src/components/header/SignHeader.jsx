import React from 'react'
import brandLogo from "../../assets/logo.png"
import { useNavigate } from 'react-router-dom';

import DarkModeBtn from '../buttons/DarkModeBtn';
import Logo from '../Logo';
import EmployerBtn from '../buttons/EmployerBtn';


const SignHeader = () => {
   
   
    return (
        <header className="outerDiv z-40 rounded-b-md">

          <div className="  bg-white dark:bg-darkColor flex justify-between items-center px-4 pt-1.5 border-b-0.5 border-b-brandColor-dark   rounded-b-md ">
            
    
              <Logo/>
            
            <div className="flex justify-evenly gap-2 items-center mb-0 mt-1">
              
           
              <div className= "pb-2">
            <DarkModeBtn />
          </div>
          
          <div>
            <div className="border-r-0.5 border-gray-600 h-6 mb-2.5"></div>
          </div>

         <EmployerBtn/>
            </div>
            
          </div>
    
         
           
    
        </header>
      );
}

export default SignHeader