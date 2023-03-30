import React from "react";
import {
  Queue,
  QueueProps,
  QueueItemProps,
  QueueItemState,
  QueueItemDataProps,
} from "./useQueue.types";

export function useQueue<T>(props?: QueueProps): Queue<T> {
  const {
    order = "newest-first",
    transitionDelay = 300,
    stackable = false,
  } = props || {};
  const [queue, setQueue] = React.useState<QueueItemProps<T>[]>([]);
  const [itemInFocus, setItemInFocus] = React.useState<QueueItemProps<T>>();
  // Store the states in refs to keep them consistent between function calls
  // https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
  const queueRef = React.useRef(queue);
  queueRef.current = queue;
  const itemInFocusRef = React.useRef(itemInFocus);
  itemInFocusRef.current = itemInFocus;

  const generateRandomId = () => "_" + new Date().getTime();

  const updateState = React.useCallback(
    (id: QueueItemProps<T>["id"], state: QueueItemState) => {
      setQueue(
        queueRef.current.map((item) =>
          item.id === id
            ? {
                ...item,
                state,
              }
            : item
        )
      );
    },
    []
  );

  const open = React.useCallback(
    (data?: T & QueueItemDataProps): QueueItemProps<T>["id"] => {
      const id = data?.id || generateRandomId();
      const newQueueItem: QueueItemProps<T> = {
        id,
        state: "queued",
        data: data || ({} as T),
        closeAfter: data?.closeAfter,
      };
      setQueue(
        queueRef.current
          .map(
            (item): QueueItemProps<T> =>
              order === "newest-first" && !stackable
                ? { ...item, state: "queued" }
                : item
          )
          .concat([newQueueItem])
      );
      if (newQueueItem.state === "active") {
        setItemInFocus(newQueueItem);
      }
      return id;
    },
    []
  );

  const pop = React.useCallback((id: QueueItemProps<T>["id"]) => {
    setQueue([...queueRef.current.filter((item) => item.id !== id)]);
    setItemInFocus(undefined);
  }, []);

  const close = React.useCallback(
    (id?: QueueItemProps<T>["id"]) => {
      const idOfItemToBeClosed = id || itemInFocusRef.current?.id;
      if (idOfItemToBeClosed) {
        // Alow to transition out before actually removing the item from the list
        updateState(idOfItemToBeClosed, "transitioning_out");
        setTimeout(() => pop(idOfItemToBeClosed), transitionDelay);
      }
    },
    [updateState, itemInFocus, transitionDelay, pop]
  );

  React.useEffect(() => {
    const nextActiveItem =
      order === "oldest-first"
        ? queueRef.current[0]
        : queueRef.current[queueRef.current.length - 1];
    if (nextActiveItem && itemInFocusRef.current?.id !== nextActiveItem.id) {
      updateState(nextActiveItem["id"], "active");
      setItemInFocus(nextActiveItem);
      if (nextActiveItem.closeAfter) {
        setTimeout(() => close(nextActiveItem.id), nextActiveItem.closeAfter);
      }
    }
  }, [queue, updateState, close]);

  return {
    open,
    close,
    queue,
    activeItems: queue.filter((i) => i.state === "active"),
  };
}
export default useQueue;
