import React from "react";
import FontAwesome from "react-fontawesome";
import { BreadcrumbType, BreadcrumbsType } from "../types/Breadcrumbs";
import "./Breadcrumbs.css";

const Breadcrumb = ({ title, onClick, isLastBreadcrumb }: BreadcrumbType) => {
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

const Breadcrumbs = ({ breadcrumbs, className, style }: BreadcrumbsType) => {
  return breadcrumbs?.length ? (
    <div className={`common__breadcrumbs ${className || ""}`} style={style}>
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
