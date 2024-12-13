import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const SignFooter = () => {
  return (
    <div className="py-4">
    <div className='flex justify-center p-2 m-2 gap-2'>
      <FacebookIcon fontSize='small' className='cursor-pointer hover:text-blue-500'/>
      <InstagramIcon fontSize='small' className='cursor-pointer hover:text-rose-500'/>
      <XIcon fontSize='small' className='cursor-pointer hover:text-black'/>
    </div>
    <div className="text-center text-xs">Workio, Inc. &copy; All Rights Reserved Worldwide</div>
  </div>
  )
}

export default SignFooter