import React, { Component } from "react";
import { Table } from "react-virtualized";
import findIndex from "lodash/findIndex";
import FontAwesome from "react-fontawesome";
import { sortListByType } from "./CustomTableHelper";
import {
  CustomTableStateType,
  CustomTableType,
  HeaderRendererParams,
  ListItemType,
  SortDirection,
} from "../types/Table";
import "./CustomTable.css";

const HEIGHT_OFFSET = 50; // Account height for the things outside of the table (title, searchbox, and etc)

const HIGHLIGHTED_TABLE_ROW_COLOR = "rgba(69, 192, 193, 0.2)";

const BORDER_OFFSET = 2;

class CustomTable extends Component<CustomTableType, CustomTableStateType> {
  constructor(props: CustomTableType) {
    super(props);
    this.state = {
      updateTable: false,
      highlightIndex: -1,
      filterValue: "",
      sortDirection: SortDirection.Asc,
      sortBy: null,
    };

    // this.handleSearch = this.handleSearch.bind(this);
    this.getRowColor = this.getRowColor.bind(this);
    this.headerRenderer = this.headerRenderer.bind(this);
    this.getSortedList = this.getSortedList.bind(this);
    this.getRowClassName = this.getRowClassName.bind(this);
  }

  componentDidMount() {
    this.setState({
      sortBy: this.props.defaultSortBy,
      sortDirection: this.props.defaultSortDirection,
    });
  }

  componentDidUpdate(prevProps: CustomTableType) {
    if (prevProps !== this.props) {
      const { highlightRow, list } = this.props;
      const sortedList = this.getSortedList(list);

      if (highlightRow) {
        const highlightIndex = findIndex(sortedList, {
          id: highlightRow.id,
        });

        this.setState({
          highlightIndex: highlightIndex,
        });
      }
    }
  }

  noRowsRenderer() {
    return <div className="noDataRow">No data available</div>;
  }

  getRowColor = (index: number) => {
    const { highlightIndex } = this.state;

    if (highlightIndex !== -1 && index === highlightIndex) {
      return { backgroundColor: HIGHLIGHTED_TABLE_ROW_COLOR };
    }

    return { backgroundColor: "#fff" };
  };

  handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    this.setState({
      filterValue: value,
    });
  }

  headerRenderer({ dataKey, label, disableSort }: HeaderRendererParams) {
    const { sortBy, sortDirection } = this.state;
    return (
      <div
        onClick={() => {
          disableSort ? null : this.setSortingOrder(dataKey);
        }}
        className={disableSort ? "disablePointerEvent" : "clickable"}
      >
        {sortBy === dataKey ? (
          <FontAwesome name={`sort-${sortDirection}`} className="icon" />
        ) : null}

        {label}
      </div>
    );
  }

  setSortingOrder(columnKey: string) {
    const { sortDirection, sortBy } = this.state;

    if (columnKey !== sortBy) {
      this.setState({
        sortBy: columnKey,
        sortDirection: SortDirection.Asc,
      });
    } else {
      const nextSortDirection =
        sortDirection === SortDirection.Asc
          ? SortDirection.Desc
          : SortDirection.Asc;
      this.setState({
        sortDirection: nextSortDirection,
      });
    }
  }

  csvDownload(list: ListItemType[]) {
    this.props.csvDownload(list);
  }

  getSortedList(list: ListItemType[]) {
    const { customSort } = this.props;
    const { sortBy, sortDirection } = this.state;

    if (!sortBy) {
      return list;
    }
    if (customSort && customSort[sortBy]) {
      return sortDirection === SortDirection.Asc
        ? customSort[sortBy](list, sortBy)
        : customSort[sortBy](list, sortBy).reverse();
    } else {
      return sortListByType(list, sortBy, sortDirection);
    }
  }

  getRowClassName(row: string | Function) {
    const { rowClassName } = this.props;
    if (rowClassName) {
      if (typeof rowClassName === "string") {
        return rowClassName;
      } else {
        return row ? rowClassName(row) : "";
      }
    }
  }

  getTableHeight({
    title,
    filterPillbox,
    csvDownload,
    filterKey,
    filterRow,
  }: CustomTableType) {
    if (title || filterPillbox || csvDownload || filterKey || filterRow) {
      return this.props.height - HEIGHT_OFFSET;
    } else {
      return this.props.height;
    }
  }

  render() {
    const {
      title,
      list,
      children,
      width,
      rowHeight,
      headerHeight = 40,
      headerRenderer,
      filterKey,
      cellClassName,
      deferredMeasurementCache,
    } = this.props;

    const { highlightIndex, updateTable } = this.state;

    const TableHeight = this.getTableHeight(this.props);

    const sortedlist = this.getSortedList(list);

    let childrenWithProps = null;

    if (children) {
      childrenWithProps = React.Children.map(children, (child) => {
        // provide default headerRenderer
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            headerRenderer: headerRenderer ?? this.headerRenderer,
          });
        }
        return null;
      });
    }

    return sortedlist && Array.isArray(sortedlist) ? (
      <div
        className={`customTable ${this.props.className}`}
        style={{ width: width }}
      >
        {title ? (
          <div
            className="customTable__titleContainer"
            style={filterKey ? {} : { marginBottom: "20px" }}
          >
            {title && <div className="customTable__title">{title}</div>}
          </div>
        ) : null}

        <Table
          deferredMeasurementCache={deferredMeasurementCache}
          width={width - BORDER_OFFSET}
          height={TableHeight}
          headerHeight={headerHeight}
          rowCount={sortedlist.length}
          rowGetter={({ index }) => sortedlist[index]}
          rowHeight={rowHeight ? rowHeight : 40}
          noRowsRenderer={this.noRowsRenderer}
          rowStyle={({ index }) => this.getRowColor(index)}
          scrollToIndex={highlightIndex}
          updateTable={updateTable}
          gridClassName={cellClassName}
          onRowClick={this.props.onRowClick}
          rowClassName={({ index }) => this.getRowClassName(sortedlist[index])}
        >
          {childrenWithProps}
        </Table>
      </div>
    ) : (
      <div>Table error</div>
    );
  }
}

export default CustomTable;
