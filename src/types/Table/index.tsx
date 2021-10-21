import React, { CSSProperties, Ref } from "react";
import {
  CellMeasurerCache,
  RowMouseEventHandlerParams,
} from "react-virtualized";

export enum SortDirection {
  Asc = "asc",
  Desc = "desc",
}

export type ListItemType =
  | string
  | number
  | boolean
  | null
  | undefined
  | {
      [key: string]: ListItemType;
    };

export type HeaderRendererParams = {
  disableSort: boolean;
  label: React.ReactNode | React.ReactNode[];
  dataKey: string;
};

export type CustomTableStateType = {
  updateTable: boolean;
  highlightIndex: number;
  filterValue: string;
  sortDirection: SortDirection;
  sortBy: string | null;
};

export type CustomTableType = {
  /** The title of the table shown above */
  title: string;
  /** The  className given to table container */
  className: string;
  /** The array of objects, each representing a row */
  list: ListItemType[];
  /** How many pixels from left to right does the table take up */
  width: number;
  /** How many pixels from top to bottom does the table take up */
  height: number;
  /** How many pixels in height is the header row */
  headerHeight: number;
  /** A function used to render the header  */
  headerRenderer: Function;
  /** Highlights the row with data matching the passed in object */
  highlightRow: {
    id: string;
  };
  /** The row containing the dropdowns, inputs, and dateselectors for filtering */
  filterRow: React.ReactNode[] | React.ReactNode;
  /** The children of this table are usually the react-virtualized Column components  */
  children: React.ReactNode | React.ReactNode[];
  /** Shows the selected values of the dropdown in a pillbox */
  filterPillbox: React.ReactNode[] | React.ReactNode;
  /** Which column (identified by key) is what the table is originally sorted by */
  defaultSortBy: string;
  /** Is the table originally sorted ascending (asc) or descending (desc) */
  defaultSortDirection: SortDirection;
  /** Provides an input field that filters the list of objects based on the value
   *  of the given property
   **/
  filterKey: string;
  /** css className given to the inner grid container */
  cellClassName: string;
  /** the height in pixels of each row, defaults to 40 if none given */
  rowHeight: number;
  /** A function that is given the entire list as an argument. Shows a button
   *  with the label ".csv" that triggers the function when clicked
   */
  csvDownload: Function;
  /** The function called when a row is clicked. Given the row object as an argument */
  onRowClick: (info?: RowMouseEventHandlerParams) => void | undefined;
  /** An object with properties corresponding to a column dataKey with the value being
   *  a custom sorter to be used to sort the list by that column
   */
  customSort: {
    [key: string]: (arg0: ListItemType[], arg1: string) => Array<any>;
  };
  /**
   * A string that gives all row containers the className or a function that takes in
   * the row object and determines the row container className
   */
  rowClassName: string | Function;
  /** a react-virtualized CellMeasurerCache that allows for customizable row heights
   *  depending on the contained data
   */
  deferredMeasurementCache: CellMeasurerCache;
};

export type RowData = {
  id: string;
};

export type DatatableHeader = {
  label: JSX.Element | null;
  key: string;
  width: number;
  fixed: boolean;
  cellRenderer?: Function;
  disableSort?: boolean;
  rightAlign?: boolean;
  className?: string;
};

export type DatatableListItem = {
  id: number;
  status: string;
  name: string;
  issuedBy: string;
  type: string;
  [key: string]: string | number;
};

export type DatatableType = {
  title: string;
  /** The array of objects depicting the properties of each column. The properties
   *  label (header title), key (object property name), and width are required for
   *  every column. The cellRenderer property can be provided for custom rendering.
   *  the fixed boolean indicates whether or not it stays visible while scrolling
   *  right. sort property is given a function to sort more complex properties, and
   *  rightAlign boolean is to change it from the default left align
   **/
  headers: DatatableHeader[];
  /** The array of objects, each representing a row */
  list: DatatableListItem[];
  /** How many pixels from left to right does the table take up */
  width: number;
  /** How many pixels from top to bottom does the table take up */
  height: number;
  /** The row containing the dropdowns, inputs, and dateselectors for filtering */
  filterRow: React.ReactNode | React.ReactNode[];
  /** Shows the selected values of the dropdown in a pillbox */
  filterPillbox: React.ReactNode | React.ReactNode[];
  /** Which column (identified by key) is what the table is originally sorted by */
  defaultSortBy?: string;
  /** Is the table originally sorted ascending (asc) or descending (desc) */
  defaultSortDirection?: SortDirection;
  /** Provides an input field that filters the list of objects based on the value
   *  of the given property
   **/
  filterKey: string;
  /** The placeholder text if the input field is present  */
  filterTitle: string;
  /** Highlights a given row on hover */
  highlightRow: boolean;
  /** The function executed when any cell is clicked, with the row data as the
   * argument
   **/
  onCellClick: (rowValue: DatatableListItem | string | null) => void;
  /** Provides a checkbox for each row, and each click runs the given method
   *  with the row data as the argument
   **/
  onCheckboxClick: Function;
  /** Allows the parent to control the check list state by passing in the
   *  array of objects they want checked
   **/
  checkedList: RowData[];
  /** Removes the internal divider between rows */
  collapseBorder: boolean;
  /** Displays a loading indicator while true */
  isLoading: boolean;
  /** The height of every row */
  rowHeight: number;
  /** If the property being searched for by the input field is more complicated that 1 level,
   *  provide a function that takes in the list and column key and returns the filtered list
   */
  customSearch: Function;
  forwardedRef: Ref<any>;
  /** Given the unfiltered list length, augments the filterPillbox to show how many rows are left
   *  compared to the original length
   */
  noFilterListCount: number;
  /** To enable constant highlight of a row instead of just during mouse hover. Takes in an object
   *  which is matched to the list, or a function to help compare
   */
  highlightSelected: Object | Function;
  /** Applies the rowClassName to the whole row instead of just a cell */
  getRowClassName: Function;
  /** Where to place buttons and other interactable components */
  actionRow: React.ReactNode | React.ReactNode[];
  /** Removes the check all checkbox */
  disableSelectAll: boolean;
  /** Disables every checkbox from being checked */
  disableCheckbox: boolean;
};

export type DatatableGridType = {
  height: number;
  width: number;
  rowHeight: number;
  headers: DatatableHeader[];
  list: DatatableListItem[];
  onCellClick?: (rowValue: DatatableListItem | string | null) => void;
  fixedColumn?: number;
  sortBy: string;
  sortDirection: SortDirection;
  setSortBy: Function;
  setSortDirection: Function;
  highlightRow: boolean;
  collapseBorder: boolean;
  highlightSelected: Object | Function;
  getRowClassName?: Function;
};

export type DatatableGridHeaderRendererParams = {
  columnIndex: number;
  key: string;
  style: CSSProperties;
};

export type RowRendererParams = {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: CSSProperties;
};
