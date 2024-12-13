import React,{useEffect} from 'react'

import {useNavigate} from "react-router-dom"
import DarkModeBtn from '../components/buttons/DarkModeBtn';
const ErrorPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className='flex h-screen dark:bg-darkColor justify-center items-center gap-2'>
        no such page exists
        <div className='invisible'><DarkModeBtn/></div>
        <div className='underline cursor-pointer' onClick={()=>navigate("/")}>Return to home</div>
    </div>
  )
}

export default ErrorPage