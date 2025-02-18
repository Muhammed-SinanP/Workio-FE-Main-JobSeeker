import React, { useEffect } from 'react'
import PasswordChangeForm from '../components/forms/PasswordChangeForm'

const ChangePasswordPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='min-h-screen outerDiv '>
        <div className='innerDiv w-full flex justify-center items-center mt-8' >
            <PasswordChangeForm/>
        </div>
    </div>
  )
}

export default ChangePasswordPage