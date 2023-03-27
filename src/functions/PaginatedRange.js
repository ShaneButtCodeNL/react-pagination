import { useMemo } from "react";

export const ELLIPSIS = "...";
/**
 * Gets an inclusive range between to values
 * @param {number} start
 * @param {number} end
 * @returns Array of numbers in range [start,end]
 */
const range = (start, end) => {
  if (start > end) [start, end] = [end, start];
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

export const PaginatedRange = ({
  //Total Number of items
  totalCount,
  //Number of items per page
  pageSize,
  //Number of pages to allow acess to next to current page
  siblingCount = 1,
  //The position of the current page
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    //Total number of pages we need to hold all items
    const totalPageCount = Math.ceil(totalCount / pageSize);
    //
    //Is equal to first page + last page + current page + siblings + 2* ELLIPSIS === siblingcount +5
    const totalPageNumberCount = siblingCount + 5;
    /*
     *  Case  : If the number of pages is less than the number we want to display
     *  Sol'n : return range [1,totalPageCount]
     */
    if (totalPageCount <= totalPageNumberCount) return range(1, totalPageCount);
    //Find range for sibling
    const leftSiblingIndex = Math.max(1, currentPage - siblingCount);
    const rightSiblingIndex = Math.min(
      totalPageCount,
      currentPage + siblingCount
    );
    // Used to determine if ellipsis should be displayed. Ellipsis will be shown if the are pages between left sibling index and first page
    // and if there are pages between the last page index and the right sibling index.
    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex <= totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    return [
      ...(showLeftEllipsis
        ? [firstPageIndex, ELLIPSIS]
        : leftSiblingIndex === 2
        ? [firstPageIndex]
        : []),
      ...range(leftSiblingIndex, rightSiblingIndex),
      ...(showRightEllipsis
        ? [ELLIPSIS, lastPageIndex]
        : rightSiblingIndex === lastPageIndex - 1
        ? [lastPageIndex]
        : []),
    ];
  }, [totalCount, pageSize, siblingCount, currentPage]);
  return paginationRange;
};
