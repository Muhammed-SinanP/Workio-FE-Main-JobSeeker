import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PaginationBtn from "../components/PaginationBtn";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useConfirm } from "material-ui-confirm";
import axios from "axios";
import { axiosInstance } from "../config/axiosInstance";

const MyApplications = () => {
  const [filteredApplications, setFilteredApplications] = useState([])
  const [showDiv, setShowDiv] = useState(["filter", "sort"])
  const [status, setStatus] = useState("")
  const [sortData, setSortData] = useState({
    sortCriteria: "date",
    sortOrder: "desc"
  })
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [refresh,setRefresh] = useState(true)
  const [pageNo, setPageNo] = useState(0)
  const [pageCount, setpageCount] = useState(0)
  const confirm = useConfirm()

  const [data, error, isLoading] = useFetch(`/user/myApplications?status=${status}&sortCriteria=${sortData.sortCriteria}&sortOrder=${sortData.sortOrder}&pageNo=${pageNo + 1}&rowsPerPage=${rowsPerPage}`,[refresh]);

  useEffect(() => {
    setFilteredApplications(data?.applications)
    setpageCount(data?.totalPages)
  }, [data])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleVisibilty(element) {
    if (showDiv.includes(element)) {
      setShowDiv(showDiv.filter(item => item !== element))
    }
    else {
      setShowDiv([...showDiv, element])
    }
  }

  function handleRowsPerPage(e) {
    const value = e.target.value;
    setRowsPerPage(value)
    setPageNo(0)
  }

  function handleSortChange(e) {

    const { name, value } = e.target
    setSortData(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
    setPageNo(0)
  }
  function handleRejected() {

    async function removeRejected() {

      try {
        const response = await axiosInstance({
          url: "/user/myApplications/removeRejected",
          method: "DELETE",
         
        }
        )
        if (response.status === 200) {
          console.log("deleted")
          setRefresh(!refresh)
        }
        else {
          console.log("not deleted")
        }
      } catch (err) {
        console.log(err, "error occured while removal")
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
    console.log(e.selected)
    setPageNo(e.selected)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  return (
    <div className="outerDiv relative min-h-screen pb-32">
      <div className="innerDiv pb-0 text-sm capitalize tracking-wide dark:text-darkColor-text">



        <div className="flex">
          <div className="font-medium "><span className="cursor-pointer flex" onClick={() => handleVisibilty("filter")}>Filter{showDiv.includes("filter") ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}</span></div>
          {showDiv.includes("filter") && <div className="ml-1 grid grid-cols-12 gap-4 gap-y-2 sm:gap-6  sm:ml-2">
            <div className="flex flex-col gap-1 col-span-6"> <div>Status</div>
              <select name="status" id="status" className="inputStyle" defaultValue={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">All</option>
                <option value="applied">Applied</option>
                <option value="approved">Approved</option>
                <option value="in-review">In-review</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>}
        </div>

        <div className="flex  mt-4">

          <div className="font-medium "><span className="cursor-pointer flex" onClick={() => handleVisibilty("sort")}>Sort{showDiv.includes("sort") ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}</span></div>
          {showDiv.includes("sort") && <div className="ml-1 grid grid-cols-12 gap-4 sm:gap-6  sm:ml-2">
            <div className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 flex flex-col gap-1">
              <select name="sortCriteria" id="sortCriteria" className="inputStyle" defaultValue={sortData.sortCriteria} onChange={handleSortChange}>
                <option value="name" className="text-xs">Name</option>
                <option value="date" className="text-xs">Date Applied</option>
              </select>
            </div>

            <div className="col-span-6 sm:col-span-8 md:col-span-6 lg:col-span-4 flex flex-col gap-1">
              <select name="sortOrder" id="sortOrder" className="inputStyle" defaultValue={sortData.sortOrder} onChange={handleSortChange}>
                <option value="asc" className="text-xs">Ascending {sortData.sortCriteria === "name" ? "(A-Z)" : "(Oldest to Newest)"}</option>
                <option value="desc" className="text-xs">Descending {sortData.sortCriteria === "name" ? "(Z-A)" : "(Newest to Oldest)"}</option>
              </select>
            </div>



          </div>}

        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
          <div className="flex items-center"> <div className="font-medium text-start">Rows per page:</div>
            <select name="rowsPerPage" id="rowsPerPage" onChange={handleRowsPerPage} defaultValue={rowsPerPage} className="w-14 inputStyle ml-1 sm:ml-2">
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
          {filteredApplications && filteredApplications.length > 0 && filteredApplications.some(application => application.status === "rejected") && <div className="mt-4 sm:mt-0">
            <button onClick={handleRejected} className="btn btn-sm bg-red-500 text-white  hover:bg-red-600 flex justify-center"><DeleteForeverIcon className="-mr-2" fontSize="small" />Remove Rejected Applications</button>
          </div>}
        </div>
      </div>


      <div className="innerDiv pt-0 mt-4">


        <table className="tracking-wide w-full  dark:text-darkColor-text">
          <thead><tr className="bg-brandColor rounded-t-md text-white text-lg grid grid-cols-12  gap-2   py-2">
            <th className="col-span-4">Status</th>
            <th className="col-span-4">Job</th>
            <th className="col-span-4">Employer</th>
          </tr></thead>
          <tbody>
            {isLoading ? Array.from({ length: rowsPerPage }, (_, i) => <tr key={i} className={` grid grid-cols-12 items-center  gap-2 border-b border-darkColor-input py-2`}>
              <td className="col-span-4 text-center" ><div className="h-6 w-28 mx-auto skeleton"></div></td>
              <td className="col-span-4 text-center" ><div className="h-6 w-56 mx-auto skeleton"></div></td>
              <td className="col-span-4 text-center" ><div className="h-6 w-56 mx-auto skeleton"></div></td>
            </tr>) :
              filteredApplications && filteredApplications.length > 0 && filteredApplications.map((application, index) =>

                <tr className={`capitalize ${application.status === "approved" && "text-brandColor bg-white dark:bg-gray-100"} ${application.status === "in-review" && "text-yellow-500  bg-white dark:bg-gray-100"} ${application.status === "rejected" && "text-red-500 bg-white dark:bg-gray-100"} font-medium col-span-12 grid grid-cols-12 items-center w-full gap-2 border-b border-darkColor-input  py-2`}>
                  <td className="col-span-4 text-center" >{application?.status}</td>
                  <td className="col-span-4 text-center" >{application?.job?.title}</td>
                  <td className="col-span-4 text-center" >{application?.job?.employer?.name}</td>
                </tr>

              )

            }




          </tbody>

        </table>



      </div>



      <div className=" w-full flex justify-center absolute bottom-8">
        <PaginationBtn handlePageClick={handlePageClick} pageNo={pageNo} pageCount={pageCount} />
      </div>

    </div>
  );
};

export default MyApplications;
