import React from "react";
import { getVariantClassName, getSizeClassName, getIcon } from "./ButtonHelper";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { ButtonProps } from "../types/Button";

const cx = classNames.bind(styles);

const Button = ({
  className = "",
  style = undefined,
  variant = "outline",
  size = "small",
  onClick = undefined,
  disabled,
  icon = undefined,
  iconPosition = "left",
  iconClassName = "",
  isLoading = false,
  type = "button",
  as: Component = "button",
  children,
  ...props
}: ButtonProps) => {
  const variantClassName = getVariantClassName(variant);

  const sizeClassName = getSizeClassName(size);

  const buttonIcon = getIcon(isLoading, icon, iconClassName);

  return (
    <Component
      className={`${cx(
        "button",
        sizeClassName,
        variantClassName
      )} ${className}`}
      onClick={onClick}
      disabled={isLoading || disabled}
      style={style}
      type={type}
      {...props}
    >
      <>
        {iconPosition === "left" && buttonIcon}

        <span>{children}</span>

        {iconPosition === "right" && buttonIcon}
      </>
    </Component>
  );
};

export default Button;
