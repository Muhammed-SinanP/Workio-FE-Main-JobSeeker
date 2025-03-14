import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/authSchema";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const LoginForm = ({ submitAuthForm }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  return (
    <form
      onSubmit={handleSubmit(submitAuthForm)}
      className="flex flex-col gap-2.5"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="dark:text-dark-text">
          Email
        </label>
        <input
          id="email"
          placeholder="jhondoe@gmail.com"
          className={`${errors.email && "border-red-500"} input-style dark:text-dark-text`}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="dark:text-dark-text">
          Password
        </label>
        <div className="relative flex flex-col gap-1">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="****"
            className={`${errors.password && "border-red-500"} input-style pr-8 dark:text-dark-text`}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-1.5 top-1 rounded-full"
          >
            {showPassword ? (
              <VisibilityIcon className="cursor-pointer text-dark-text" />
            ) : (
              <VisibilityOffIcon className="cursor-pointer text-dark-text" />
            )}
          </span>
        </div>
      </div>

      <div className="-mt-2 text-end">
        <span
          onClick={() => navigate("/forgotPassword")}
          className="cursor-pointer text-sm font-medium text-blue-500 hover:text-blue-600 sm:text-xs"
        >
          forgot password?
        </span>
      </div>

      <div className="mt-2.5">
        <input type="submit" value="Login" className={`sign-btn-submit btn`} />
      </div>
    </form>
  );
};

export default LoginForm;
