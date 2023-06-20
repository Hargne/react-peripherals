export interface DrawerProps {
  title?: string;
  width?: string | number;
  anchor?: "left" | "right" | "top" | "bottom";
  content: React.ReactNode;
  contentBackgroundColor?: string;
}
