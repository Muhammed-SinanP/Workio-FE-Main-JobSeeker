import React from 'react'
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from 'react-router-dom';

const SignInBtn = () => {
    const navigate = useNavigate()
  return (
      <button onClick={() => navigate("/auth/login")} className="sign-btn bg-brand">
          <PersonIcon fontSize="small" className="p-1" />
          <span className="tracking-wide">Sign In</span>
      </button>
  )
}

export default SignInBtn