import React from "react";
import * as PropTypes from "prop-types";
import { getVariantClassName, getSizeClassName, getIcon } from "./ButtonHelper";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

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
}) => {
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

Button.propTypes = {
  /** The className given to the button */
  className: PropTypes.string,
  /** The style given to the button */
  style: PropTypes.object,
  /** Gives preset styling options ("primary", "error", "outline", "error-outline") for the color, background-color, and text */
  variant: PropTypes.oneOf(["primary", "error", "outline", "error-outline"]),
  /** Determines the height of the button */
  size: PropTypes.oneOf(["large", "medium", "small"]),
  /** Determines whether it's just a button or has interactions with forms (reset, submit) */
  type: PropTypes.oneOf(["button", "reset", "submit"]),
  /** The function executed when clicking a button */
  onClick: PropTypes.func,
  /** If true, the button will become greyed-out and not responsive to actions */
  disabled: PropTypes.bool,
  /** The FontAwesome icon name to show the icon */
  icon: PropTypes.string,
  /** Where the icon will be shown in relation to the text if present */
  iconPosition: PropTypes.oneOf(["left", "right"]),
  /** Any styling needed to apply to the icon specifically can be added via className */
  iconClassName: PropTypes.string,
  /** The content of the button */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  as: PropTypes.elementType,
  /** Grey out the button while true */
  isLoading: PropTypes.bool,
};

export default Button;
