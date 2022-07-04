import React from "react";

import Dialog from "./components/Dialog/Dialog";
import { DialogProps } from "./components/Dialog/Dialog.types";
import Drawer from "./components/Drawer/Drawer";
import { DrawerProps } from "./components/Drawer/Drawer.types";
import Loading from "./components/Loading/Loading";
import { LoadingProps } from "./components/Loading/Loading.types";
import Notification from "./components/Notification/Notification";
import { NotificationProps } from "./components/Notification/Notification.types";
import useQueue from "./hooks/useQueue";
import { PeripheralsContextProps } from "./Peripherals.types";

export const PeripheralsContext = React.createContext(
  {} as PeripheralsContextProps
);

const Peripherals: React.FC = (props) => {
  //const queueList = props.components.map(({ component, ...queueProps }) => useQueue<typeof component>(queueProps))
  const loadingQueue = useQueue<LoadingProps>({
    order: "newest-first",
  });
  const notificationQueue = useQueue<NotificationProps>({
    order: "oldest-first",
  });
  const dialogQueue = useQueue<DialogProps>({
    order: "newest-first",
    stackable: true,
  });
  const drawerQueue = useQueue<DrawerProps>({
    order: "newest-first",
    stackable: true,
  });

  return (
    <PeripheralsContext.Provider
      value={{
        loading: {
          open: loadingQueue.open,
          close: loadingQueue.close,
        },
        dialog: {
          open: dialogQueue.open,
          close: dialogQueue.close,
        },
        notification: {
          open: notificationQueue.open,
          close: notificationQueue.close,
        },
        drawer: {
          open: drawerQueue.open,
          close: drawerQueue.close,
        },
      }}
    >
      {loadingQueue.queue.map((item) => (
        <Loading
          key={`loading-${item.id}`}
          data={item.data}
          onClose={() => loadingQueue.close(item.id)}
          isOpen={loadingQueue.activeItems
            .map((item) => item.id)
            .includes(item.id)}
        />
      ))}
      {notificationQueue.queue.map((item) => (
        <Notification
          key={`alert-${item.id}`}
          data={item.data}
          onClose={() => notificationQueue.close(item.id)}
          isOpen={notificationQueue.activeItems
            .map((item) => item.id)
            .includes(item.id)}
          closable={!!!item.closeAfter}
        />
      ))}
      {dialogQueue.queue.map((item) => (
        <Dialog
          key={`dialog-${item.id}`}
          data={item.data}
          onClose={() => dialogQueue.close(item.id)}
          isOpen={dialogQueue.activeItems
            .map((item) => item.id)
            .includes(item.id)}
        />
      ))}
      {drawerQueue.queue.map((item, i) => (
        <Drawer
          key={`drawer-${item.id}`}
          data={{
            ...item.data,
            width: item.data.width || 1024 - i * 64,
          }}
          onClose={() => drawerQueue.close(item.id)}
          isOpen={drawerQueue.activeItems
            .map((item) => item.id)
            .includes(item.id)}
        />
      ))}
      {props.children}
    </PeripheralsContext.Provider>
  );
};

export default Peripherals;