import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from "react-hook-form"
import { passwordResetSchema } from '../../schemas/authSchema'
import { axiosInstance } from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const PasswordResetForm = ({resetToken}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({resolver:zodResolver(passwordResetSchema)})
    const navigate = useNavigate()
    
    async function resetPassword(data) {
       
          try {
            const response = await axiosInstance({
              method: "POST",
              url: `/auth/resetPassword/${resetToken}`,
              data: data,
            });
            if (response.status === 200) {
              toast.success("Password Reseted Successfully");
              navigate("/");
            }
          } catch (err) {
            if(err.status === 401){
                toast.error("Expired / Invalid token")
                navigate("/forgotPassword")
            }
           else if(err.status === 409){
            toast.error("Passwords do not match")
                navigate("/forgotPassword")
           }
           else{
                navigate("/forgotPassword")
           }
          }
        
    }
    
    return (
        <form onSubmit={handleSubmit(resetPassword)} className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
                <label htmlFor="password">Enter new password</label>
                <input
                    id="password"
                    {...register("password")}
                    className="input-style"
                    placeholder="****"
                />
                {errors.password && <p className="text-xs tracking-wide text-red-500">{errors.password.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword">Confirm new password</label>
                <input
                    id="ConfirmPassword"
                    {...register("confirmPassword")}
                    className="input-style"
                    placeholder="****"
                />
                {errors.confirmPassword && <p className="text-xs tracking-wide text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <div className="mt-2 text-center">
                <input
                    type="submit"
                    className="btn btn-wide bg-brand text-base text-white hover:bg-brand-dark"
                />
            </div>
        </form>
    )
}

export default PasswordResetForm