import React from "react";
import { PaginatedRange, ELLIPSIS } from "../functions/PaginatedRange";
import "./PaginatedDivNav.css";

const PaginatedDivNav = (props) => {
  const {
    pageChangeEvent,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = PaginatedRange({
    totalCount,
    pageSize,
    currentPage,
    siblingCount,
  });

  /*
   *   Case  : There are less than 2 pages in range
   *   Sol'n : Return no range
   */
  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onNext = () => {
    pageChangeEvent(currentPage + 1);
  };

  const onPrev = () => {
    pageChangeEvent(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav class="pagination-range">
      <ul class="pagination-range-list">
        <li
          class={`pagination-range-list-item prev-page ${
            currentPage === 1 ? "disabled" : ""
          }`}
          onClick={onPrev}
        >
          {"<"}
        </li>
        {paginationRange.map((pageNumber) => {
          // Is Ellipsis unicode for ellipsis is [ &#8230; ]
          if (pageNumber === ELLIPSIS)
            return (
              <li className="pagination-range-list-item ellipsis">&#8230;</li>
            );
          return (
            <li
              className={`pagination-range-list-item ${
                currentPage === pageNumber ? "active" : ""
              }`}
              onClick={() => pageChangeEvent(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          class={`pagination-range-list-item next-page ${
            currentPage === lastPage ? "disabled" : ""
          }`}
          onClick={onNext}
        >
          {">"}
        </li>
      </ul>
    </nav>
  );
};

export default PaginatedDivNav;
