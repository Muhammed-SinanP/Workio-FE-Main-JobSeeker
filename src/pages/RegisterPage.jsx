import React from 'react'
import AuthForm from '../components/forms/AuthForm'
import { useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });
  return (
    <div className="outerDiv">
      <div className="innerDiv  flex justify-center items-center  py-4 pb-4">
    <AuthForm isRegister={true} formData={formData} setFormData={setFormData}/>
    </div>
    </div>
  )
}

export default RegisterPage