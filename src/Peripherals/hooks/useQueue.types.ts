type QueueOrder = "newest-first" | "oldest-first";

export interface Queue<T> {
  open: (data?: T & QueueItemDataProps) => QueueItemProps<T>["id"];
  close: (id?: QueueItemProps<T>["id"]) => void;
  queue: QueueItemProps<T>[];
  activeItems: QueueItemProps<T>[];
}
export interface QueueProps {
  transitionDelay?: number;
  order?: QueueOrder;
  stackable?: boolean;
}

export type QueueItemState = "queued" | "active" | "transitioning_out";
export interface QueueItemProps<T> {
  id: string;
  data: T;
  state: QueueItemState;
  closeAfter?: number;
}
export interface QueueItemDataProps {
  id?: string;
  closeAfter?: number;
}
