import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PaginationBtn from "../../components/buttons/PaginationBtn";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useConfirm } from "material-ui-confirm";
import { axiosInstance } from "../../config/axiosInstance";

const ApplicationsPage = () => {
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [showDiv, setShowDiv] = useState(["filter", "sort"]);
  const [status, setStatus] = useState("");
  const [sortData, setSortData] = useState({
    sortCriteria: "date",
    sortOrder: "desc",
  });
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [refresh, setRefresh] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const confirm = useConfirm();

  const [data, error, isLoading] = useFetch(
    `/user/myApplications?status=${status}&sortCriteria=${sortData.sortCriteria}&sortOrder=${sortData.sortOrder}&pageNo=${pageNo + 1}&rowsPerPage=${rowsPerPage}`,
    [refresh],
  );

  useEffect(() => {
    console.log(data);
    
    setFilteredApplications(data?.filteredApplications);
    setpageCount(data?.totalPages);
  }, [data]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  function handleSortChange(e) {
    const { name, value } = e.target;
    setSortData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setPageNo(0);
  }
  function handleRejected() {
    async function removeRejected() {
      try {
        const response = await axiosInstance({
          url: "/user/myApplications/removeRejected",
          method: "DELETE",
        });
        if (response.status === 200) {
          console.log("deleted");
          setRefresh(!refresh);
        } else {
          console.log("not deleted");
        }
      } catch (err) {
        console.log(err, "error occured while removal");
      }
    }

    confirm({
      title: "Removal Confirmation",
      description: "Are you sure you want to remove all rejected applications?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    })
      .then(() => {
        removeRejected();
      })
      .catch(() => {
        console.log("Removal cancelled");
      });
  }

  function handlePageClick(e) {
    console.log(e.selected);
    setPageNo(e.selected);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="outer-div min-h-screen">
      <div className="inner-div flex flex-col gap-4 pb-0 text-sm capitalize tracking-wider dark:text-dark-text">
        <div className="flex flex-col gap-2 rounded-md border bg-white p-4 dark:bg-dark">
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
            <div className="ml-1 grid grid-cols-12 gap-4 gap-y-2 sm:ml-2 sm:gap-6">
              <div className="col-span-6 flex flex-col gap-1 sm:col-span-3">
                {" "}
                <div>Status</div>
                <select
                  name="status"
                  id="status"
                  className="input-style"
                  defaultValue={status}
                  onChange={(e) => setStatus(e.target.value)}
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

        <div className="flex flex-col gap-2 rounded-md border bg-white p-4 dark:bg-dark">
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
            <div className="ml-1 grid grid-cols-12 gap-4 sm:ml-2 sm:gap-6">
              <div className="col-span-6 flex flex-col gap-1 sm:col-span-4 md:col-span-3 lg:col-span-2">
                <select
                  name="sortCriteria"
                  id="sortCriteria"
                  className="input-style"
                  defaultValue={sortData.sortCriteria}
                  onChange={handleSortChange}
                >
                  <option value="name" className="text-xs">
                    Job Title
                  </option>
                  <option value="date" className="text-xs">
                    Date Applied
                  </option>
                </select>
              </div>

              <div className="col-span-6 flex flex-col gap-1 sm:col-span-8 md:col-span-6 lg:col-span-4">
                <select
                  name="sortOrder"
                  id="sortOrder"
                  className="input-style"
                  defaultValue={sortData.sortOrder}
                  onChange={handleSortChange}
                >
                  <option value="asc" className="text-xs">
                    Ascending{" "}
                    {sortData.sortCriteria === "name"
                      ? "(A-Z)"
                      : "(Oldest to Newest)"}
                  </option>
                  <option value="desc" className="text-xs">
                    Descending{" "}
                    {sortData.sortCriteria === "name"
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
            {" "}
            <div className="text-start font-medium">Rows per page:</div>
            <select
              name="rowsPerPage"
              id="rowsPerPage"
              onChange={handleRowsPerPage}
              defaultValue={rowsPerPage}
              className="input-style ml-1 w-14 sm:ml-2"
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
        <table className="w-full tracking-wide dark:text-dark-text">
          <thead>
            <tr className="grid grid-cols-12 gap-2 rounded-t-md bg-brand py-2 text-lg text-white">
              <th className="col-span-4">Status</th>
              <th className="col-span-4">Job</th>
              <th className="col-span-4">Employer</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: rowsPerPage }, (_, i) => (
                <tr
                  key={i}
                  className={`grid grid-cols-12 items-center gap-2 border-b border-dark-input py-2`}
                >
                  <td className="col-span-4 text-center">
                    <div className="skeleton mx-auto h-6 w-1/2"></div>
                  </td>
                  <td className="col-span-4 text-center">
                    <div className="skeleton mx-auto h-6 w-4/5"></div>
                  </td>
                  <td className="col-span-4 text-center">
                    <div className="skeleton mx-auto h-6 w-4/5"></div>
                  </td>
                </tr>
              ))
            ) : filteredApplications && filteredApplications.length > 0 ? (
              filteredApplications.map((application, index) => (
                <tr
                  className={`capitalize ${application.status === "approved" && "bg-white text-brand dark:bg-gray-100"} ${application.status === "in-review" && "bg-white text-yellow-500 dark:bg-gray-100"} ${application.status === "rejected" && "bg-white text-red-500 dark:bg-gray-100"} col-span-12 grid w-full grid-cols-12 items-center gap-2 border-b border-dark-input py-2 font-medium`}
                >
                  <td className="col-span-4 text-center">
                    {application?.status}
                  </td>
                  <td className="col-span-4 text-center">
                    {application?.job?.title}
                  </td>
                  <td className="col-span-4 text-center">
                    {application?.job?.employer?.name}
                  </td>
                </tr>
              ))
            ) : (
              <div className="mt-4 text-center">
                No data available to display.
              </div>
            )}
          </tbody>
        </table>
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
