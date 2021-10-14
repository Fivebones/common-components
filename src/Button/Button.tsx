import React from "react";
import FontAwesome from "react-fontawesome";
import { ButtonType } from "../types/Button";
import "./Button.css";

const getTypeClassName = (type: string): React.CSSProperties => {
  switch (type) {
    case "primary":
      return "commonPrimaryButton" as React.CSSProperties;
    case "danger":
      return "commonDangerButton" as React.CSSProperties;
    default:
      return "commonDefaultButton" as React.CSSProperties;
  }
};

const getIcon = (isLoading: boolean, icon: string, iconClassName: string) => {
  if (isLoading) {
    return <FontAwesome name="spinner" className="loadingIcon fa-pulse" />;
  } else if (icon) {
    return <FontAwesome name={icon} className={`${iconClassName}`} />;
  }

  return null;
};

const Button = ({
  className = "",
  style,
  type,
  onClick,
  disabled,
  icon,
  iconClassName = "",
  isLoading,
  outline,
  isSubmit,
  children,
}: ButtonType) => {
  const typeClassName = getTypeClassName(type);
  const buttonIcon = getIcon(isLoading, icon, iconClassName);

  return (
    <button
      className={`commonButton ${typeClassName} ${outline ? "buttonOutline" : ""
        } ${className}`}
      onClick={onClick}
      disabled={isLoading || disabled}
      style={style}
      type={isSubmit ? "submit" : "button"}
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
