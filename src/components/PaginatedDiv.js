import { useMemo } from "react";
import PaginatedDivNav from "./PaginatedDivNav";
import "./PaginatedDiv.css";

export const PaginatedDiv = (props) => {
  //const [currentPage, setCurrentPage] = useState(1);
  const { data, pageSize, siblingCount, currentPage, setCurrentPage } = props;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, data]);
  return (
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <PaginatedDivNav
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={pageSize}
        pageChangeEvent={(page) => setCurrentPage(page)}
        siblingCount={siblingCount}
      />
    </div>
  );
};
