import React from "react";
import AuthForm from "../components/forms/AuthForm";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    
    userEmail: "",
    userPassword: "",
  });
 
  return (
    <div className="outerDiv ">
      <div className="innerDiv h-full  flex justify-center items-center  py-4">
        <AuthForm isRegister={false} formData={formData} setFormData={setFormData}/>
      </div>
    </div>
  );
};

export default LoginPage;