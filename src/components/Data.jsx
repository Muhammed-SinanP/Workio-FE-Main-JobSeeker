import React from 'react'
import FeedIcon from '@mui/icons-material/Feed';

import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import BoostImg from "../assets/Boost.png"
import PrepImg from "../assets/Prep.png"
import LearnImg from "../assets/Learn.png"
import NetworkImg from "../assets/Network.png"

export const NavbarData = [
    {
        title:"Home",
        path:"/",
        icon:<HomeIcon fontSize='small'/>
    },
    {
        title:"Jobs",
        path:"/jobs",
        icon:<WorkIcon fontSize='small'/>
    },
]


export const userNavbarData = [
    {
        title:"My Applications",
        path:"/myApplications",
        icon:<FeedIcon fontSize='small'/>
    },
    {
        title:"My Profile",
        path:"/myProfile",
        icon:<PersonIcon fontSize='small'/>
    },
    
   
   
]


export const userSuggestions = [
    {
        img:BoostImg,
        title:"Boost",
        subtitle:"Stand out to employers",
        link:"https://www.seek.com.au/career-advice/article/simple-ways-to-stand-out-to-employers-when-youre-job-hunting"
    },
    {
        img:PrepImg,
        title:"Prep",
        subtitle:"Up your interview success rate",
        link:"https://www.indeed.com/career-advice/interviewing/successful-interview"
    },
    {
        img:LearnImg,
        title:"Learn",
        subtitle:"Upskill to get ahead",
        link:"https://www.aurora-talent.com/blog/2022/04/6-steps-to-upskill-yourself?source=google.com"
    },
    {
        img:NetworkImg,
        title:"Network",
        subtitle:"Grow with like minded people",
        link:"https://hbr.org/2023/03/a-beginners-guide-to-networking"
    },
]


export const footerSeekerData=[
    {
        title:"Create Free Account",
        path:"/sign/register"
    },
    {
        title:"Find Jobs",
        path:"/jobs"
    },
    {
        title:"Search Job",
        path:"/"
    },

    
]

export const footerEmployerData=[
    {
        title:"Employer Center",
        link:import.meta.env.VITE_FRONTEND_EMPLOYER
    },
    
    
]

export const footerContactData = [
    {
        title:"Email us",
        emailTo:"mailto:iam.muhammedsinan.p@gmail.com"
    },
    

]


export const footerBrandData = [
    {
        title:"Privacy Policy"
    },
    {
        title:"Terms Of Use"
    },
    {
        title:"Cookie Policy"
    }
]