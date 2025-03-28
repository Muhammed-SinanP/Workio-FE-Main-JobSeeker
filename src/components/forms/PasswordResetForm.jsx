import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { passwordResetSchema } from "../../schemas/authSchema";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PasswordResetForm = ({ resetToken }) => {
  const [disableBtn,setDisableBtn] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(passwordResetSchema) });
  const navigate = useNavigate();

  async function resetPassword(data) {
   setDisableBtn(true)
   const loading = toast.loading("Resetting password")
    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/auth/resetPassword/${resetToken}`,
        data: data,
      });
      toast.dismiss(loading)
      if (response.status === 200) {
        toast.success("Password resetted successfully");
        navigate("/");
      }else{
        toast.error("Password reset failed")
        navigate("/forgotPassword");
      }
    } catch (err) {
      toast.dismiss(loading)
      if (err.status === 401) {
        toast.error("Expired / Invalid token");
        navigate("/forgotPassword");
      } else if (err.status === 409) {
        toast.error("Passwords do not match");
        navigate("/forgotPassword");
      } else {
        toast.error("Password reset failed")
        navigate("/forgotPassword");
      }
    }finally{
      setDisableBtn(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(resetPassword)}
      className="flex flex-col gap-2.5"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Enter new password</label>
        <input
          id="password"
          {...register("password")}
          className="input-style"
          placeholder="****"
          autoComplete="off"
        />
        {errors.password && (
          <p className="err-msg">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="confirmPassword">Confirm new password</label>
        <input
          id="ConfirmPassword"
          {...register("confirmPassword")}
          className="input-style"
          placeholder="****"
          autoComplete="off"
        />
        {errors.confirmPassword && (
          <p className="err-msg">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="mt-2 text-center">
        <button
          disabled={disableBtn}
          className="btn btn-wide bg-brand text-base text-white hover:bg-brand-dark"
        >Submit</button>
      </div>
    </form>
  );
};

export default PasswordResetForm;
