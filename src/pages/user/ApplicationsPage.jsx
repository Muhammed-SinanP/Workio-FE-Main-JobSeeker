import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PaginationBtn from "../../components/buttons/PaginationBtn";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useConfirm } from "material-ui-confirm";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import ApplicationsTable from "../../components/user/ApplicationsTable";
import { useForm } from "react-hook-form";

const ApplicationsPage = () => {
  const { register, watch } = useForm({
    defaultValues: {
      status: "",
      sortCriteria: "date",
      sortOrder: "desc"
    }
  })
  const status = watch("status")
  const sortCriteria = watch("sortCriteria")
  const sortOrder = watch("sortOrder")
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [showDiv, setShowDiv] = useState(["filter", "sort"]);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [refreshApplications, setRefreshApplications] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const confirm = useConfirm();

  const [applicationsData, applicationsError, applicationsLoading] = useFetch(
    `/user/myApplications?status=${status}&sortCriteria=${sortCriteria}&sortOrder=${sortOrder}&pageNo=${pageNo + 1}&rowsPerPage=${rowsPerPage}`,
    [refreshApplications],
  );

  useEffect(() => {
    if (applicationsData) {
      setFilteredApplications(applicationsData.filteredApplications);
      setpageCount(applicationsData.totalPages);
    }
  }, [applicationsData]);


  function handleVisibilty(element) {
    if (showDiv.includes(element)) {
      setShowDiv(showDiv.filter((item) => item !== element));
    } else {
      setShowDiv([...showDiv, element]);
    }
  }

  function handleRowsPerPage(e) {
    const value = e.target.value;
    setRowsPerPage(value);
    setPageNo(0);
  }

  useEffect(() => {
    setPageNo(0)
  }, [status, sortCriteria, sortOrder])


  function handleRejected() {
    async function removeRejected() {
      toast.dismiss()
      const loading = toast.loading("Removing rejected applications")
      try {
        const response = await axiosInstance({
          url: "/user/myApplications/removeRejected",
          method: "DELETE",
        });
        toast.dismiss(loading)
        if (response.status === 200) {
          setRefreshApplications(!refreshApplications);
          toast.success("Rejected applications removed successfully");
        }else{
          toast.error("Rejected applications removal failed")
        }
      } catch (err) {
        toast.dismiss(loading)
        toast.error("Rejected applications removal failed")
      }
    }

    confirm({
      title: "Removal Confirmation",
      description: "Are you sure you want to remove all rejected applications?",
      confirmationText: "Confirm",
    })
      .then(() => {
        removeRejected();
      })
  }

  function handlePageClick(e) {
    setPageNo(e.selected);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="page-div">
      <div className="inner-div flex flex-col gap-4 pb-0 text-sm capitalize tracking-wider dark:text-dark-text">
        <div className="flex flex-col gap-2 rounded-md border bg-white p-2 dark:bg-dark">
          <div
            className="flex cursor-pointer justify-between text-base font-medium"
            onClick={() => handleVisibilty("filter")}
          >
            Filter
            {showDiv.includes("filter") ? (
              <ArrowDropUpIcon fontSize="small" />
            ) : (
              <ArrowDropDownIcon fontSize="small" />
            )}
          </div>
          {showDiv.includes("filter") && (
            <div className=" grid grid-cols-12 gap-4 gap-y-2  sm:gap-6">
              <div className="col-span-6 flex flex-col gap-1 sm:col-span-4 md:col-span-3 lg:col-span-2">
                <div>Status</div>
                <select
                  {...register("status")}
                  className="input-style cursor-pointer"
                >
                  <option value="">All</option>
                  <option value="applied">Applied</option>
                  <option value="approved">Approved</option>
                  <option value="in-review">In-review</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 rounded-md border bg-white p-2 dark:bg-dark">
          <div
            className="flex cursor-pointer justify-between text-base font-medium"
            onClick={() => handleVisibilty("sort")}
          >
            Sort by
            {showDiv.includes("sort") ? (
              <ArrowDropUpIcon fontSize="small" />
            ) : (
              <ArrowDropDownIcon fontSize="small" />
            )}
          </div>
          {showDiv.includes("sort") && (
            <div className=" grid grid-cols-12 gap-4  sm:gap-6">
              <div className="col-span-6 flex flex-col gap-1 sm:col-span-4 md:col-span-3 lg:col-span-2">
                <select
                  {...register("sortCriteria")}
                  className="input-style cursor-pointer"
                >
                  <option value="name" className="text-xs">
                    Job Title
                  </option>
                  <option value="date" className="text-xs">
                    Date Applied
                  </option>
                </select>
              </div>

              <div className="col-span-6 flex flex-col gap-1 sm:col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3">
                <select
                  {...register("sortOrder")}
                  className="input-style cursor-pointer"
                >
                  <option value="asc" className="text-xs">
                    Ascending{" "}
                    {sortCriteria === "name"
                      ? "(A-Z)"
                      : "(Oldest to Newest)"}
                  </option>
                  <option value="desc" className="text-xs">
                    Descending{" "}
                    {sortCriteria === "name"
                      ? "(Z-A)"
                      : "(Newest to Oldest)"}
                  </option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <div className="text-start font-medium">Rows per page:</div>
            <select
              name="rowsPerPage"
              id="rowsPerPage"
              onChange={handleRowsPerPage}
              defaultValue={rowsPerPage}
              className="input-style cursor-pointer ml-1 w-14 sm:ml-2"
            >
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
          {filteredApplications &&
            filteredApplications.length > 0 &&
            filteredApplications.some(
              (application) => application.status === "rejected",
            ) && (
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={handleRejected}
                  className="btn btn-sm flex justify-center bg-red-500 text-white hover:bg-red-600"
                >
                  <DeleteForeverIcon className="-mr-2" fontSize="small" />
                  Remove Rejected Applications
                </button>
              </div>
            )}
        </div>
      </div>

      <div className="inner-div mt-4 pt-0">
        <ApplicationsTable
          isLoading={applicationsLoading}
          rowsPerPage={rowsPerPage}
          applications={filteredApplications}
        />
      </div>

      <div className="flex w-full justify-center">
        <PaginationBtn
          handlePageClick={handlePageClick}
          pageNo={pageNo}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};

export default ApplicationsPage;
