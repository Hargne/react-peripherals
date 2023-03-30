import { DialogProps } from "./components/Dialog/Dialog.types";
import { DrawerProps } from "./components/Drawer/Drawer.types";
import { LoadingProps } from "./components/Loading/Loading.types";
import { NotificationProps } from "./components/Notification/Notification.types";
import { Queue } from "./hooks/useQueue.types";

export interface PeripheralsContextProps {
  loading: Queue<LoadingProps>;
  dialog: Queue<DialogProps>;
  notification: Queue<NotificationProps>;
  drawer: Queue<DrawerProps>;
}
