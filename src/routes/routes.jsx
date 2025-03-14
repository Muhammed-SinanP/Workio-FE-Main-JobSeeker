import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import JobsPage from "../pages/JobsPage";
import ProfilePage from "../pages/user/ProfilePage";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "../pages/ErrorPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import ChangePasswordPage from "../pages/user/ChangePasswordPage";
import SavedJobsPage from "../pages/user/SavedJobsPage";
import ApplicationsPage from "../pages/user/ApplicationsPage";
import JobDetailsPage from "../pages/JobDetailsPage";

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
      {},
      {
        path: "/resetPassword/:resetToken",
        element: <ResetPasswordPage />,
      },
      {
        path: "jobs",
        element: <JobsPage />,
      },
      {
        path: "jobDetails/:jobId",
        element: <JobDetailsPage />,
      },
      {
        element: <ProtectedRoutes signInRequired={true} />,
        children: [
          {
            path: "myProfile",
            element: <ProfilePage />,
          },
          {
            path: "changeMyPassword",
            element: <ChangePasswordPage />,
          },
          {
            path: "mySavedList",
            element: <SavedJobsPage />,
          },
          {
            path: "myApplications",
            element: <ApplicationsPage />,
          },
        ],
      },

      {
        path: "auth",
        element: <ProtectedRoutes signInRequired={false} />,
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
