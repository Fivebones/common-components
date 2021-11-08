import React from "react";
import FontAwesome from "react-fontawesome";

export const getVariantClassName = (variant) => {
  switch (variant) {
    case "primary":
      return "button--primary";
    case "error":
      return "button--error";
    case "error-outline":
      return "button--error-outline";
    default:
      return "button--outline";
  }
};

export const getSizeClassName = (size) => {
  switch (size) {
    case "large":
      return "button--large";
    case "medium":
      return "button--medium";
    default:
      return "button--small";
  }
};

export const getIcon = (isLoading, icon, iconClassName) => {
  if (isLoading) {
    return <FontAwesome name="spinner" className="loadingIcon fa-pulse" />;
  } else if (icon) {
    return <FontAwesome name={icon} className={`${iconClassName}`} />;
  }

  return null;
};
