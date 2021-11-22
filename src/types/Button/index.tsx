export type ButtonProps = {
  /** The className given to the button */
  className: string;
  /** The style given to the button */
  style: React.CSSProperties | undefined;
  /** Gives preset styling options ("primary", "error", "outline", "error-outline") for the color, background-color, and text */
  variant: "primary" | "error" | "outline" | "error-outline";
  /** Determines the height of the button */
  size: "large" | "medium" | "small";
  /** Determines whether it's just a button or has interactions with forms (reset, submit) */
  type: "button" | "reset" | "submit";
  /** The function executed when clicking a button */
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  /** If true, the button will become greyed-out and not responsive to actions */
  disabled: boolean;
  /** The FontAwesome icon name to show the icon */
  icon: string | undefined;
  /** Where the icon will be shown in relation to the text if present */
  iconPosition: "left" | "right";
  /** Any styling needed to apply to the icon specifically can be added via className */
  iconClassName: string;
  /** The content of the button */
  children: React.ReactNode[] | React.ReactNode;
  as: React.ElementType;
  /** Grey out the button while true */
  isLoading: boolean;
};
