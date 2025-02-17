import React from "react";

export type ModalType = {
  /** The className given to the Modal Container */
  className: string;
  /** The style given to the Modal Container */
  style: React.CSSProperties;
  /** Determines the width of the modal */
  size: ModalSize;
  /** The boolean controlling whether modal is visible or not */
  open: boolean;
  /** The function that is called as a boolean is closing */
  onClose: React.MouseEventHandler<HTMLDivElement>;
  /** The content rendered inside the modal */
  children: React.ReactNode | React.ReactNode[];
  /**
   * The focus is changed by default to the first focusable element in the modal.
   * If the focus is not wanted at all, set this to true
   */
  disableInitialFocus: boolean;
  /**
   * Pass a ref to the desired initialFocus if the default focus is on the wrong element
   */
  initialFocusRef: React.RefObject<HTMLDivElement> | undefined;
  /** A string that labels the current element for screen readers */
  ariaLabel: string;
};

export type HeaderType = {
  /** The className given to the Modal Header */
  className: string;
  /** The style given to the Modal Header */
  style: React.CSSProperties;
  /** Shows an exit icon for the header if prop is present */
  closeButton: boolean;
  /** The content rendered inside the modal header */
  children: React.ReactNode | React.ReactNode[];
};

export type BodyType = {
  /** The className given to the Modal Body */
  className: string;
  /** The style given to the Modal Body */
  style: React.CSSProperties;
  /** The content rendered inside the modal body */
  children: React.ReactNode | React.ReactNode[];
};

export type FooterType = {
  /** The className given to the Modal Footer */
  className: string;
  /** The style given to the Modal footer */
  style: React.CSSProperties;
  /** The content rendered inside the modal footer */
  children: React.ReactNode | React.ReactNode[];
};

export enum ModalSize {
  Large = "large",
  Small = "small",
}
