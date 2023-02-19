import React from "react";
import { SentenceType } from "../../typings";
import Pagination from "../Util/Pagination";
type Props = {
  tableData: SentenceType[] | null | undefined;
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (number: number) => void;
};
export default function TableCheckbox({
  tableData,
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}: Props) {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <nav
          className="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {currentPage === 1
                ? 1
                : ((currentPage - 1) * postsPerPage + 1).toLocaleString()}{" "}
              to {(currentPage * postsPerPage).toLocaleString()}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {totalPosts.toLocaleString()}
            </span>
          </span>
          <ul className="flex  items-center justify-between space-x-4">
            <li>
              <a
                href="#"
                onClick={() => {
                  currentPage === 1 ? paginate(1) : paginate(currentPage - 1);
                }}
                className="block px-3 py-2 text-gray-500 bg-white rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={totalPosts}
                currentPage={currentPage}
                paginate={paginate}
              />
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  //check currentpage is the last page
                  currentPage === Math.ceil(totalPosts / postsPerPage)
                    ? paginate(currentPage)
                    : paginate(currentPage + 1);
                }}
                className="block px-3 py-2  text-gray-500 bg-white rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Incorrect Text
              </th>
              <th scope="col" className="px-6 py-3">
                Correct Text
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item: SentenceType, index: number) => (
              <tr
                key={item?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.id}
                </td>
                <td className="px-6 py-4">{item?.incorrect_text} </td>
                <td className="px-6 py-4">{item?.correct_text} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
