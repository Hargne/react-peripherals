import React from "react";

import { Alert, AlertTitle, Snackbar } from "@mui/material";

import transitionWrapper from "../transitionWrapper";
import { NotificationProps } from "./Notification.types";

const Notification: React.FC<{
  data: NotificationProps;
  onClose: () => void;
  isOpen: boolean;
}> = (props) => {
  const isClosable = Boolean(props.data.closable);

  return (
    <Snackbar
      open={props.isOpen}
      anchorOrigin={{
        vertical: props.data.position?.vertical ?? "bottom",
        horizontal: props.data.position?.horizontal ?? "center",
      }}
      TransitionComponent={transitionWrapper(props.data.transition)}
    >
      <Alert
        severity={props.data.type}
        onClose={isClosable ? props.onClose : undefined}
        closeText="Close Notification"
      >
        {props.data.title && <AlertTitle>{props.data.title}</AlertTitle>}
        {props.data.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
