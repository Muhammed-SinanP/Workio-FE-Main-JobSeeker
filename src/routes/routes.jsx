import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

import RegisterPage from "../pages/RegisterPage";
import JobPage from "../pages/JobPage";
import MyProfile from "../pages/MyProfilePage";
import MyApplications from "../pages/MyApplications";
import JobDetails from "../pages/JobDetails";

import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "../pages/ErrorPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/resetPassword/:resetToken",
        element: <ResetPasswordPage />,
      },
      {
        path: "jobs",
        element: <JobPage />,
      },
      {
        path: "jobDetails/:jobId",
        element: <JobDetails />,
      },
      {
        element: <ProtectedRoutes signIn={true} />,
        children: [
          {
            path: "myProfile",
            element: <MyProfile />,
          },
          {
            path: "myApplications",
            element: <MyApplications />,
          },
        ],
      },

      {
        path: "sign",
        element: <ProtectedRoutes signIn={false} />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);
