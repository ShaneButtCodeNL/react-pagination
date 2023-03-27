import "./App.css";
import makeList from "./functions/MakeList";
import { PaginatedDiv } from "./components/PaginatedDiv";
import { useState } from "react";
import { DebugMenu } from "./components/DebugMenu";

function App() {
  const [data, setData] = useState(() => makeList(100));
  const [siblingCount, setSiblingCount] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDebug, setShowDebug] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="page">
      <div className="App">
        <h1>An Example of Pagination</h1>
        <div
          style={{ margin: "auto", width: "fit-content", padding: "0 0 1em 0" }}
        >
          <button type="button" onClick={() => setShowDebug(true)}>
            Debug
          </button>
        </div>
        <PaginatedDiv
          data={data}
          pageSize={pageSize}
          siblingCount={siblingCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <DebugMenu
        show={showDebug}
        hideShowEvent={setShowDebug}
        dataSize={data.length}
        siblingCount={siblingCount}
        pageSize={pageSize}
        updateData={(n) => setData(makeList(n))}
        updateSiblingCount={(n) => setSiblingCount(n)}
        updatePageSize={(n) => setPageSize(n)}
        resetPage={() => setCurrentPage(1)}
      />
    </div>
  );
}

export default App;
