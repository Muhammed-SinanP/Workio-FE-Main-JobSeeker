import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "job",
        element: <div>Jobs page</div>,
      },
      {
        path: "myProfile",
        element: <div>profile page</div>,
      },
      {
        path: "myApplications",
        element: <div>applications page</div>,
      },
    ],
  },
]);
