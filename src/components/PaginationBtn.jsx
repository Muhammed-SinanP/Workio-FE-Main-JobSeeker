import React from 'react'
import ReactPaginate from 'react-paginate';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const PaginationBtn = ({ handlePageClick,pageNo,pageCount}) => {
  return (
      <ReactPaginate
          containerClassName="my-10 flex gap-2 items-center justify-center "

          pageLinkClassName="w-8 font-medium h-8 bg-white dark:bg-gray-300 dark:hover:bg-gray-200 flex justify-center items-center border-0.5 border-borderColor rounded-md shadow-sm"

          previousLinkClassName="w-8 h-8 bg-white dark:bg-gray-300 dark:hover:bg-gray-200 flex justify-center items-center border-0.5  border-borderColor rounded-md shadow-sm"

          nextLinkClassName="w-8 h-8 bg-white dark:bg-gray-300 dark:hover:bg-gray-200 flex justify-center items-center border-0.5 border-borderColor rounded-md shadow-sm"

          activeLinkClassName="!bg-brandColor scale-110 text-white "

          breakLinkClassName="dark:text-gray-300"

          disabledLinkClassName="cursor-not-allowed hover:bg-white dark:hover:bg-gray-300 text-darkColor opacity-50"

          breakLabel="..."
          previousLabel={<KeyboardArrowLeftIcon />}
          nextLabel={<KeyboardArrowRightIcon/>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          forcePage={pageNo ? pageNo : 0}

      />
  )
}

export default PaginationBtn