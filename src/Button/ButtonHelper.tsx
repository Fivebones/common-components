import React from "react";
import FontAwesome from "react-fontawesome";
import { ButtonSize, ButtonTypePreset, ButtonVariant } from "../types/Button";

export const getTypeClassName = (type: ButtonTypePreset): string => {
  switch (type) {
    case ButtonTypePreset.Primary:
      return "commonPrimaryButton";
    case ButtonTypePreset.Danger:
      return "commonDangerButton";
    default:
      return "commonDefaultButton";
  }
};

export const getVariantClassName = (variant: ButtonVariant): string => {
  switch (variant) {
    case ButtonVariant.Primary:
      return "button--primary";
    case ButtonVariant.Error:
      return "button--error";
    default:
      return "button--outline";
  }
};

export const getSizeClassName = (size: ButtonSize): string => {
  switch (size) {
    case ButtonSize.Large:
      return "button--large";
    case ButtonSize.Medium:
      return "button--medium";
    default:
      return "button--small";
  }
};

export const getIcon = (
  isLoading: boolean,
  icon: string,
  iconClassName: string
): JSX.Element | null => {
  if (isLoading) {
    return <FontAwesome name="spinner" className="loadingIcon fa-pulse" />;
  } else if (icon) {
    return <FontAwesome name={icon} className={`${iconClassName}`} />;
  }

  return null;
};
