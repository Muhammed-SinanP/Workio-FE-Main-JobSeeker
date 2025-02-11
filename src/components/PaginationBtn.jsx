import React from 'react'
import ReactPaginate from 'react-paginate';


const PaginationBtn = ({ handlePageClick,pageNo,pageCount}) => {
  return (
      <ReactPaginate
          containerClassName="my-10 flex gap-2 items-center justify-center "

          pageLinkClassName="w-8 h-8 bg-white dark:bg-gray-300 hover:bg-gray-200 flex justify-center items-center border-0.5 border-borderColor rounded-md shadow-sm"

      previousLinkClassName="w-8 h-8 bg-white dark:bg-gray-300 hover:bg-gray-200 flex justify-center items-center border-0.5  border-borderColor rounded-md shadow-sm"

      nextLinkClassName="w-8 h-8 bg-white dark:bg-gray-300 hover:bg-gray-200 flex justify-center items-center border-0.5  border-borderColor rounded-md shadow-sm"

          activeLinkClassName="!bg-brandColor !scale-110 text-white "

          breakLinkClassName="dark:text-gray-300"

          disabledLinkClassName="cursor-not-allowed !bg-darkColor-light dark:hover:bg-black hover:bg-green-50 text-darkColor opacity-40"

          breakLabel="..."
          nextLabel={<span className="font-bold">&#x1F862;</span>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          forcePage={pageNo ? pageNo : 0}
          previousLabel={<span className="font-bold opa">&#x1F860;</span>}

      />
  )
}

export default PaginationBtn