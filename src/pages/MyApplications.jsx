import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import ApplicationsTable from "../components/ApplicationsTable";

const MyApplications = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="outerDiv">
      <div className="innerDiv min-h-screen p-2 pt-4 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
        <ApplicationsTable />
      </div>
    </div>
  );
};

export default MyApplications;
