import React from "react";
import {
  getIcon,
  getSizeClassName,
  getTypeClassName,
  getVariantClassName,
} from "./ButtonHelper";
import {
  ButtonProps,
  ButtonSize,
  ButtonType,
  ButtonTypePreset,
  ButtonVariant,
} from "../types/Button";
import styles from "./Button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Button = ({
  className = "",
  style,
  type = "button",
  preset = ButtonTypePreset.Default,
  variant = ButtonVariant.Default,
  size = ButtonSize.Small,
  onClick,
  disabled,
  icon,
  iconClassName = "",
  isLoading,
  children,
}: ButtonProps) => {
  const buttonIcon = getIcon(isLoading, icon, iconClassName);

  return (
    <button
      className={`${cx(
        "button",
        getSizeClassName(size),
        getVariantClassName(variant),
        getTypeClassName(preset)
      )} ${className}`}
      onClick={onClick}
      disabled={isLoading || disabled}
      style={style}
      type={type}
    >
      <>
        {buttonIcon}

        <span className={buttonIcon ? "commonButton__iconMargin" : ""}>
          {children}
        </span>
      </>
    </button>
  );
};

export default Button;
