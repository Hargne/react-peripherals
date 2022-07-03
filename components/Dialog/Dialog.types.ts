import { ButtonProps } from "@mui/material";

import { TransitionType } from "../transitionWrapper";

export interface DialogButtonProps {
  label: string;
  preventClosingDialog?: boolean;
  onClick?: ButtonProps["onClick"];
  color?: ButtonProps["color"];
  size?: ButtonProps["size"];
}

export interface DialogProps {
  title: string;
  content: string | React.ReactNode;
  primaryButton?: DialogButtonProps;
  secondaryButton?: DialogButtonProps;
  fullScreen?: boolean;
  closable?: boolean;
  transition?: TransitionType;
}
