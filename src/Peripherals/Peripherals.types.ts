import { MouseEventHandler } from "react";
import { Queue } from "./hooks/useQueue.types";

export interface PeripheralsContextProps {
  loading: Queue<LoadingProps>;
  dialog: Queue<DialogProps>;
  notification: Queue<NotificationProps>;
  drawer: Queue<DrawerProps>;
}

export interface PeripheralsProps {
  children: React.ReactNode;
  components?: {
    [key in keyof PeripheralsContextProps]?: React.ComponentType<any>;
  };
}

export type TransitionType = "slide" | "fade" | "zoom";

export interface DialogButtonProps {
  label: string;
  preventClosingDialog?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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

export interface DrawerProps {
  title?: string;
  width?: string | number;
  anchor?: "left" | "right" | "top" | "bottom";
  content: React.ReactNode;
  contentBackgroundColor?: string;
}

export interface NotificationProps {
  title?: string;
  message: string;
  type: "success" | "info" | "error" | "warning";
  closable?: boolean;
  position?: {
    vertical?: "bottom" | "top";
    horizontal?: "left" | "center" | "right";
  };
  transition?: TransitionType;
}

export interface LoadingProps {
  message?: string;
}
