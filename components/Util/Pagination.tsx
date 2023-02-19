import React from "react";

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <a
                onClick={() => {
                  paginate(number);
                }}
                href="#"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
