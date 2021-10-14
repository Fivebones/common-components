export enum ButtonTypePreset {
  Primary = "primary",
  Danger = "danger",
  Default = "default"
};

export type ButtonType = {
  /** The className given to the button */
  className: string;
  /** The style given to the button */
  style: React.CSSProperties;
  /** Gives preset styling options ("primary", "danger", "default") for the color, background-color, and text */
  type: ButtonTypePreset;
  /** If true, adds a border around the button */
  outline: boolean;
  /** The function executed when clicking a button */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  /** If true, the button will become greyed-out and not responsive to actions */
  disabled: boolean;
  /** The FontAwesome icon name to show the icon */
  icon: string;
  /** Any styling needed to apply to the icon specifically can be added via className */
  iconClassName: string;
  /** The content of the button */
  children: React.ReactNode[] | React.ReactNode;
  /** Shows a loader in the button as well as greying out the button */
  isLoading: boolean;
  isSubmit: boolean;
};