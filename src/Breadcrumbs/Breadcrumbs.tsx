import React from "react";
import FontAwesome from "react-fontawesome";
import * as PropTypes from "prop-types";
import "./Breadcrumbs.css";

type BreadcrumbProps = {
  title: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  isLastBreadcrumb: boolean;
};

type BreadcrumbsProps = {
  /** An array of { title, onClick } objects, with title being what is displayed
     *  and onClick the function called when the breadcrumb is clicked
     */
  breadcrumbs: Array<BreadcrumbProps>,
  /** The className applied to the containing div */
  className: string,
  /** Determines the default inline style of the containing div */
  style: React.CSSProperties,
}

const Breadcrumb = ({ title, onClick, isLastBreadcrumb }: BreadcrumbProps) => {
  return isLastBreadcrumb ? (
    <div className="breadcrumb__item">{title}</div>
  ) : (
    <div className="breadcrumb__item">
      <a className="breadcrumb__link" onClick={onClick}>
        {title}
      </a>

      <FontAwesome className="icon" name="angle-right" />
    </div>
  );
};

const Breadcrumbs = ({ breadcrumbs, className, style }: BreadcrumbsProps) => {
  return breadcrumbs?.length ? (
    <div
      className={`common__breadcrumbs ${className || ""}`}
      style={style}
    >
      {breadcrumbs.map(({ title, onClick }, index) => {
        const isLastBreadcrumb = index === breadcrumbs.length - 1;

        return (
          <Breadcrumb
            key={title}
            title={title}
            onClick={onClick}
            isLastBreadcrumb={isLastBreadcrumb}
          />
        );
      })}
    </div>
  ) : null;
};

export default Breadcrumbs;
