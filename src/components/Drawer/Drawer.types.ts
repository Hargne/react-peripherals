import { PeripheralComponentProps } from "../../Peripherals.types";

export interface DrawerProps extends PeripheralComponentProps {
  title?: string;
  width?: string | number;
  anchor?: "left" | "right" | "top" | "bottom";
  content: React.ReactNode;
  contentBackgroundColor?: string;
}
