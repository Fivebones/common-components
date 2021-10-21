import React, { ChangeEvent, useEffect, useState } from "react";
import "./CustomTable.css";
import DatatableGrid from "./DatatableGrid";
import { AutoSizer } from "react-virtualized";
import findIndex from "lodash/findIndex";
import unionBy from "lodash/unionBy";
import differenceBy from "lodash/differenceBy";
import {
  getFilteredList,
  getErrorMessage,
  getSortedList,
  isAllRowChecked,
} from "./DatatableHelper";
import {
  DatatableHeader,
  DatatableType,
  RowData,
  SortDirection,
} from "../types/Table";

const DEFAULT_ROW_HEIGHT = 40;

const Datatable = (props: DatatableType) => {
  const [filterValue, setFilterValue] = useState("");
  const [checkedList, setCheckedList] = useState([] as RowData[]);
  const [selectedHeaders, setSelectedHeaders] = useState(
    [] as DatatableHeader[]
  );
  const [sortBy, setSortBy] = useState(props.defaultSortBy || "");
  const [sortDirection, setSortDirection] = useState(
    props.defaultSortDirection || SortDirection.Asc
  );

  useEffect(() => {
    if (props.headers) {
      setSelectedHeaders(props.headers);
    }
  }, [props.headers]);

  useEffect(() => {
    if (props.checkedList) {
      setCheckedList(props.checkedList);
    }
  }, [props.checkedList]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setFilterValue(value);
  };

  const onCheckboxClicked = (
    rowData: RowData,
    isChecked: boolean,
    checkedListIndex: number
  ) => {
    const newCheckedList = [...checkedList];

    if (isChecked) {
      newCheckedList.splice(checkedListIndex, 1);
    } else {
      newCheckedList.push(rowData);
    }

    if (props.checkedList) {
      props.onCheckboxClick(newCheckedList, rowData);
    } else {
      props.onCheckboxClick(newCheckedList);

      setCheckedList(newCheckedList);
    }
  };

  const onCheckAllClick = (filteredList: RowData[], checkAllState: boolean) => {
    let newCheckedList = [];
    const nextCheckedAllState = !checkAllState;

    if (nextCheckedAllState) {
      newCheckedList = unionBy(checkedList, filteredList, "id");
    } else {
      newCheckedList = differenceBy(checkedList, filteredList, "id");
    }

    // Return all the checked list to the parent
    props.onCheckboxClick(newCheckedList);

    // set checked list if not controlled by parent
    if (!props.checkedList) {
      setCheckedList(newCheckedList);
    }
  };

  const handleSetSortBy = (sortDirection: string) => {
    setSortBy(sortDirection);
  };

  const handleSetSortDirection = (sortBy: SortDirection) => {
    setSortDirection(sortBy);
  };

  const checkboxRenderer = (rowData: RowData) => {
    const checkedListIndex = findIndex(checkedList, { id: rowData.id });
    const isChecked = checkedListIndex !== -1;

    return (
      <div className="datatable__checkboxCell">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() =>
            onCheckboxClicked(rowData, isChecked, checkedListIndex)
          }
          disabled={props.disableCheckbox}
        />
      </div>
    );
  };

  const filteredList = getFilteredList(
    props.list,
    props.filterKey,
    filterValue,
    props.customSearch
  );

  const sortedFilteredList = getSortedList(
    selectedHeaders,
    filteredList,
    sortBy,
    sortDirection
  );

  const errorMessage = getErrorMessage(props.isLoading, selectedHeaders);

  const checkAllState = isAllRowChecked(sortedFilteredList, checkedList);

  const checkboxColumn = {
    label: !props.disableSelectAll ? (
      <input
        type="checkbox"
        checked={checkAllState}
        onChange={() => onCheckAllClick(sortedFilteredList, checkAllState)}
        disabled={props.disableCheckbox}
      />
    ) : null,
    key: "checkbox",
    width: 35,
    cellRenderer: checkboxRenderer,
    fixed: true,
  };

  let filterPillBoxWithCount = null;
  if (props.filterPillbox) {
    filterPillBoxWithCount =
      props.noFilterListCount && React.isValidElement(props.filterPillbox)
        ? React.cloneElement(props.filterPillbox, {
            filteredListCount: sortedFilteredList.length,
            noFilterListCount: props.noFilterListCount,
          })
        : props.filterPillbox;
  }

  return (
    <div
      className="customTable"
      style={{
        width: props.width,
        display: "flex",
        flexDirection: "column",
        height: props.height,
      }}
    >
      <div className="customTable__titleContainer">
        {props.title ? (
          <div className="customTable__title">{props.title}</div>
        ) : null}

        <div className="customTable__buttonRow">
          {props.actionRow ? (
            <div className="customTable__actionRow">{props.actionRow}</div>
          ) : null}
        </div>
      </div>

      <div className="datatable__actionContainer">
        <div className="datatable__filterRow">
          {(props.filterKey || props.customSearch) && (
            <input
              className="inputbox-compress"
              placeholder={` ${
                props.filterTitle ? props.filterTitle : "Search"
              }`}
              onChange={handleSearch}
            />
          )}

          {props.filterRow}
        </div>
      </div>

      {filterPillBoxWithCount}

      {errorMessage ? (
        <div className="noDataRow">{errorMessage}</div>
      ) : (
        <div style={{ marginTop: "10px", flex: "1 1 auto" }}>
          <AutoSizer disableWidth>
            {({ height }) => (
              <DatatableGrid
                headers={
                  props.onCheckboxClick
                    ? [checkboxColumn as DatatableHeader, ...selectedHeaders]
                    : selectedHeaders
                }
                list={sortedFilteredList}
                height={height}
                width={props.width}
                rowHeight={props.rowHeight || DEFAULT_ROW_HEIGHT}
                sortBy={sortBy}
                sortDirection={sortDirection}
                setSortBy={handleSetSortBy}
                setSortDirection={handleSetSortDirection}
                highlightRow={props.highlightRow}
                onCellClick={props.onCellClick}
                getRowClassName={props.getRowClassName}
                collapseBorder={props.collapseBorder}
                ref={props.forwardedRef}
                highlightSelected={props.highlightSelected}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

export default Datatable;
