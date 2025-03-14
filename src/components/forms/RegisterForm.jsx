import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/authSchema";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
const RegisterForm = ({ submitAuthForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  return (
    <form
      onSubmit={handleSubmit(submitAuthForm)}
      className="flex flex-col gap-2.5"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="dark:text-dark-text">
          Your full name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          placeholder="Jhon Doe"
          className={`${errors.name && "border-red-500"} input-style text-brand-dark dark:text-dark-text`}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="dark:text-dark-text">
          Email
        </label>

        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="jhondoe@gmail.com"
          className={`${errors.email && "border-red-500"} input-style dark:text-dark-text`}
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

      <div className="flex flex-col gap-1">
        <label htmlFor="confirmPassword" className="dark:text-dark-text">
          Confirm password
        </label>
        <div className="relative flex flex-col gap-1">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="****"
            className={`${errors.confirmPassword && "border-red-500"} input-style pr-8 dark:text-dark-text`}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-1.5 top-1 rounded-full"
          >
            {showConfirmPassword ? (
              <VisibilityIcon className="cursor-pointer text-dark-text" />
            ) : (
              <VisibilityOffIcon className="cursor-pointer text-dark-text" />
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="mt-1 flex items-start justify-start gap-2">
          <input
            type="checkbox"
            id="acceptTerms"
            {...register("acceptTerms")}
            className="cursor-pointer"
          />
          <label
            htmlFor="acceptTerms"
            className="-mt-0.5 text-xs font-medium dark:text-dark-text"
          >
            By signing up you agree to our{" "}
            <span className="cursor-pointer text-blue-500 underline">
              Terms and conditions
            </span>{" "}
            and{" "}
            <span className="cursor-pointer text-blue-500 underline">
              Privacy policy
            </span>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-xxs text-red-500">{errors.acceptTerms.message}</p>
        )}
      </div>

      <div className="mt-2.5">
        <input
          type="submit"
          value="Register"
          className={`sign-btn-submit btn`}
        />
      </div>
    </form>
  );
};

export default RegisterForm;
