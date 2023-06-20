import React from "react";

import Dialog from "./components/Dialog/Dialog";
import Drawer from "./components/Drawer/Drawer";
import Loading from "./components/Loading/Loading";
import Notification from "./components/Notification/Notification";
import useQueue from "./hooks/useQueue";
import {
  DialogProps,
  DrawerProps,
  LoadingProps,
  NotificationProps,
  PeripheralsContextProps,
  PeripheralsProps,
} from "./Peripherals.types";

export const PeripheralsContext = React.createContext(
  {} as PeripheralsContextProps
);

const defaultComponents: {
  [key in keyof PeripheralsContextProps]: React.ComponentType<any>;
} = {
  dialog: Dialog,
  drawer: Drawer,
  loading: Loading,
  notification: Notification,
};

const Peripherals: React.FC<PeripheralsProps> = (props) => {
  const queues: PeripheralsContextProps = {
    loading: useQueue<LoadingProps>({
      order: "newest-first",
    }),
    dialog: useQueue<DialogProps>({
      order: "newest-first",
      stackable: true,
    }),
    notification: useQueue<NotificationProps>({
      order: "oldest-first",
    }),
    drawer: useQueue<DrawerProps>({
      order: "newest-first",
      stackable: true,
    }),
  };

  const peripherals = React.useMemo<PeripheralsContextProps>(
    () => queues,
    [queues]
  );

  const renderQueues = React.useCallback(
    () =>
      Object.keys(defaultComponents).map((key) => {
        const queueKey = key as keyof PeripheralsContextProps;
        const queueEntry = queues[queueKey];
        let Component = defaultComponents[queueKey];

        if (
          props.components &&
          queueKey in props.components &&
          props.components[queueKey]
        ) {
          Component = props.components[queueKey] as React.ComponentType<any>;
        }

        return queueEntry.queue.map((item) => (
          <Component
            key={`peripherals-${key}-${item.id}`}
            data={item.data}
            onClose={() => queueEntry.close()}
            isOpen={queueEntry.isItemOpen(item.id)}
          />
        ));
      }),
    [peripherals]
  );

  return (
    <PeripheralsContext.Provider value={peripherals}>
      {renderQueues()}
      {props.children}
    </PeripheralsContext.Provider>
  );
};

export default Peripherals;
