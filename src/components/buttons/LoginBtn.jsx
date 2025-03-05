import React from 'react'
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from 'react-router-dom';


const LoginBtn = () => {
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate("/auth/login")} className="sign-btn bg-brand">
            <PersonIcon fontSize="small" className="p-1" />
            <span className="tracking-wide">Login</span>
        </button>
    )
}

export default LoginBtn