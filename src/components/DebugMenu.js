import { useRef } from "react";
import "./DebugMenu.css";

export const DebugMenu = (props) => {
  const {
    updateData,
    updateSiblingCount,
    updatePageSize,
    dataSize,
    siblingCount,
    pageSize,
    show,
    hideShowEvent,
    resetPage,
  } = props;
  const minPageSize = 1;
  const maxPageSize = 1000;
  const minSiblingCount = 1;
  const maxSiblingCount = 5;
  const minDataSize = 10;
  const maxDataSize = 1000;
  const pageSizeRef = useRef(null);
  const siblingCountRef = useRef(null);
  const dataSizeRef = useRef(null);
  const confirm = () => {
    let hasChanged = false;
    if (+dataSizeRef.current.value !== dataSize) {
      updateData(+dataSizeRef.current.value);
      hasChanged = true;
    }
    if (+pageSizeRef.current.value !== pageSize) {
      updatePageSize(+pageSizeRef.current.value);
      hasChanged = true;
    }
    if (+siblingCountRef.current.value !== siblingCount) {
      updateSiblingCount(+siblingCountRef.current.value);
      hasChanged = true;
    }
    hideShowEvent(false);
    if (hasChanged) resetPage();
  };
  const cancel = () => {
    dataSizeRef.current.value = dataSize;
    pageSizeRef.current.value = pageSize;
    siblingCountRef.current.value = siblingCount;
    hideShowEvent(false);
  };
  const minMax = (min, max, value) => Math.min(max, Math.max(min, value));
  return (
    <div
      className={`debug-window-container ${show ? "" : "hide-modal"}`}
      onClick={cancel}
    >
      <div className="debug-window" onClick={(e) => e.stopPropagation()}>
        <h1>Debug</h1>
        <form id="debug-form" onSubmit={(e) => e.preventDefault()}>
          <label for="data-size-input">
            Data
            <br />
            Size
          </label>
          <input
            name="data-size-input"
            type="number"
            defaultValue={dataSize}
            min={minDataSize}
            max={maxDataSize}
            ref={dataSizeRef}
            onChange={() => {
              dataSizeRef.current.value = minMax(
                minDataSize,
                maxDataSize,
                dataSizeRef.current.value
              );
            }}
          />
          <label for="siblings-count-input">
            Display Number
            <br />
            Of Siblings
          </label>
          <input
            name="siblings-count-input"
            type="number"
            defaultValue={siblingCount}
            min={minSiblingCount}
            max={maxSiblingCount}
            ref={siblingCountRef}
            onChange={() => {
              siblingCountRef.current.value = minMax(
                minSiblingCount,
                maxSiblingCount,
                siblingCountRef.current.value
              );
            }}
          />
          <label for="page-size-input">
            Page
            <br />
            Size
          </label>
          <input
            name="page-size-input"
            type="number"
            defaultValue={pageSize}
            min={minPageSize}
            max={maxPageSize}
            ref={pageSizeRef}
            onChange={() => {
              pageSizeRef.current.value = minMax(
                minPageSize,
                maxPageSize,
                pageSizeRef.current.value
              );
            }}
          />
          <button type="button" onClick={confirm}>
            Confirm
          </button>
          <button type="button" onClick={cancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
