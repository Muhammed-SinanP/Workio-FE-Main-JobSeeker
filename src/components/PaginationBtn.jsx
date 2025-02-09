import React from 'react'
import ReactPaginate from 'react-paginate';


const PaginationBtn = ({ handlePageClick,pageNo,pageCount}) => {
  return (
      <ReactPaginate
          containerClassName="flex gap-2 items-center justify-center "

          pageLinkClassName="w-8 h-8 bg-white dark:bg-gray-300 hover:bg-gray-200 flex justify-center items-center border rounded-md shadow-sm"

          previousLinkClassName="w-8 h-8 bg-white dark:bg-gray-300 hover:bg-gray-200 flex justify-center items-center border rounded-md shadow-sm"

          nextLinkClassName="w-8 h-8 bg-white dark:bg-gray-300 hover:bg-gray-200 flex justify-center items-center border rounded-md shadow-sm"

          activeLinkClassName="bg-[#00A264] dark:bg-[#00A264] hover:bg-[#00A264] text-white "

          breakLinkClassName="dark:text-gray-300"

          disabledLinkClassName="cursor-not-allowed hover:bg-green-50 bg-green-50 text-gray-200"

          breakLabel="..."
          nextLabel={<span className="font-bold">&#x1F862;</span>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          forcePage={pageNo ? pageNo : 0}
          previousLabel={<span className="font-bold">&#x1F860;</span>}

      />
  )
}

export default PaginationBtn