import React from "react";

export type BreadcrumbType = {
  title: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  isLastBreadcrumb: boolean;
};

export type BreadcrumbsType = {
  /** An array of { title, onClick } objects, with title being what is displayed
   *  and onClick the function called when the breadcrumb is clicked
   */
  breadcrumbs: Array<BreadcrumbType>;
  /** The className applied to the containing div */
  className: string;
  /** Determines the default inline style of the containing div */
  style: React.CSSProperties;
};
