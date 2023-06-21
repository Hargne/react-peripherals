import { TransitionType } from "../transitionWrapper.types";

export type NotificationType = "success" | "info" | "error" | "warning";
export interface NotificationProps {
  title?: string;
  message: string;
  type: NotificationType;
  closable?: boolean;
  position?: {
    vertical?: "bottom" | "top";
    horizontal?: "left" | "center" | "right";
  };
  transition?: TransitionType;
}
