import React from "react";

const ApplicationsTable = ({ isLoading, rowsPerPage, applications }) => {
  return (
    <table className="w-full tracking-wide">
      <thead className="">
        <tr className="grid grid-cols-12 gap-2 rounded-t-md bg-brand py-2 text-lg text-white">
          <th className="col-span-4">Status</th>
          <th className="col-span-4">Job</th>
          <th className="col-span-4">Employer</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {isLoading ? (
          Array.from({ length: rowsPerPage }, (_, i) => (
            <tr
              key={i}
              className={`grid grid-cols-12 items-center gap-2 border-0.5 border-t-0 bg-white py-2 dark:bg-gray-100`}
            >
              <td className="col-span-4 text-center">
                <div className="skeleton mx-auto h-5 w-1/2"></div>
              </td>
              <td className="col-span-4 text-center">
                <div className="skeleton mx-auto h-5 w-4/5"></div>
              </td>
              <td className="col-span-4 text-center">
                <div className="skeleton mx-auto h-5 w-4/5"></div>
              </td>
            </tr>
          ))
        ) : applications && applications.length > 0 ? (
          applications.map((application, index) => (
            <tr
              key={index}
              className={`capitalize ${application.status === "approved" && "text-brand"} ${application.status === "in-review" && "text-yellow-500"} ${application.status === "rejected" && "text-red-500"} col-span-12 grid w-full grid-cols-12 items-center gap-2 border-0.5 border-t-0 bg-white py-2 dark:bg-gray-100`}
            >
              <td className="col-span-4 text-center">{application?.status}</td>
              <td className="col-span-4 text-center">
                {application?.job?.title}
              </td>
              <td className="col-span-4 text-center">
                {application?.job?.employer?.name}
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td className="pt-4">No data available to display.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ApplicationsTable;
