import React from "react";
import {
  QueueProps,
  QueueItemProps,
  QueueItemState,
  QueueItemDataProps,
} from "./useQueue.types";

export function useQueue<T>(props?: QueueProps) {
  const {
    order = "newest-first",
    transitionDelay = 300,
    stackable = false,
  } = props || {};
  const [queue, setQueue] = React.useState<QueueItemProps<T>[]>([]);
  const queueRef = React.useRef(queue);
  // Store the state in a ref to keep it consistent between function calls
  // https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
  queueRef.current = queue;

  const [itemInFocus, setItemInFocus] = React.useState<QueueItemProps<T>>();

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
      const idOfItemToBeClosed = id || itemInFocus?.id;
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
    if (nextActiveItem && itemInFocus?.id !== nextActiveItem.id) {
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

// Helper class to retreive the ReturnType of a generic function
// https://stackoverflow.com/a/64919133
export class UseQueueReturnType<T> {
  return(e: T) {
    return useQueue<T>(e);
  }
}
