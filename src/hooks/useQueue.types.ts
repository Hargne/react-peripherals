type QueueOrder = "newest-first" | "oldest-first";
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
