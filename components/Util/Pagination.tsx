import React from "react";
import usePagination from "../hooks/usePagination";
import Link from "next/link";
type Props = {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (number: number) => void;
};

export const dotts = "...";

export default function Pagination({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}: Props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pages = usePagination(totalPosts, currentPage, postsPerPage);

  return (
    <nav>
      <ul className="inline-flex items-center -space-x-px">
        {pages.map((pageNumber, i) =>
          pageNumber === dotts ? (
            <span
              key={i}
              className="px-4 py-2 rounded-full text-sm font-semibold text-black"
            >
              {pageNumber}
            </span>
          ) : (
            <li key={i}>
              <a
                href="#"
                onClick={() => {
                  paginate(pageNumber as number);
                }}
                className={`${
                  pageNumber === currentPage
                    ? "text-blue-500 bg-blue-100"
                    : "text-black"
                } flex rounded px-3 py-2 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {pageNumber}
              </a>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
