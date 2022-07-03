import { DialogProps } from "./components/Dialog/Dialog.types";
import { DrawerProps } from "./components/Drawer/Drawer.types";
import { LoadingProps } from "./components/Loading/Loading.types";
import { NotificationProps } from "./components/Notification/Notification.types";
import { UseQueueReturnType } from "./hooks/useQueue";

type PeripheralItemMethods<T> = Omit<
  ReturnType<UseQueueReturnType<T>["return"]>,
  "queue" | "activeItems"
>;

export interface PeripheralsContextProps {
  loading: PeripheralItemMethods<LoadingProps>;
  dialog: PeripheralItemMethods<DialogProps>;
  notification: PeripheralItemMethods<NotificationProps>;
  drawer: PeripheralItemMethods<DrawerProps>;
}
