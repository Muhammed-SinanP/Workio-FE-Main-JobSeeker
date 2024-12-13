import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import DataTable from "react-data-table-component";
import DarkModeBtn from "./buttons/DarkModeBtn";

const ApplicationsTable = () => {
  const [applications, error, isLoading] = useFetch("/user/myApplications");
  const [filteredApplications, setFilteredApplications] =
    useState([]);
  useEffect(() => {
    setFilteredApplications(applications)
  }, [applications]);
  
  const columns = [
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Job",
      selector: (row) => row.job?.title,
    },
    {
      name: "Employer",
      selector: (row) => row.job?.employer?.name,
    },
  ];



 

  const customThemeStyles = {
    
   
   
    headCells: {
      style: {
        backgroundColor: "#00A264",
        color: "white",
        fontWeight: "semibold",
        textAlign: "center",
        fontSize: "20px",
       
      },
    },
    rows: {
      style: {
        backgroundColor: "#f0f2f0", 
      },
    },
    cells: {
      style: {
        fontSize: "18px",
      },
    },
  };
  
  const conditionalRowStyles = [
    {
      when: (row) => row.status === "Approved",
      style: {
        color: "green",
        fontWeight:"bold"
      },
    },
    {
      when: (row) => row.status === "In-review",
      style: {
        color: "yellow",
        fontWeight:"semibold"
      },
    },
    {
      when: (row) => row.status === "Rejected",
      style: {
        color: "red", // Green text
      },
    },
  ];

  function handleFilter(e) {
    const filterValue = e.target.value;
    if (filterValue === "All") {
      setFilteredApplications(applications);
    } else {
      const newData = applications.filter((element) => {
        return element.status === filterValue;
      });
      setFilteredApplications(newData);
    }
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="">
      <div className="text-end mb-4">
        <label htmlFor="filterApplications" className="mr-2 font-medium">
          Filter
        </label>

        <select
          name="filterApplications"
          id="filterApplications"
          className="inputStyle"
          onChange={handleFilter}
        >
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="In-review">In-review</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      
  <div className="shadow-md">
      <DataTable
        columns={columns}
        data={filteredApplications?filteredApplications:applications}
        pagination
        customStyles={customThemeStyles}
        conditionalRowStyles={conditionalRowStyles}
        progressPending={isLoading}
      /></div>
    </div>
  );
};

export default ApplicationsTable;
