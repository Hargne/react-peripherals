import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import transitionWrapper from "../transitionWrapper";
import { DialogProps } from "./Dialog.types";

const Dialog: React.FC<{
  data: DialogProps;
  isOpen: boolean;
  onClose: () => void;
}> = (props) => {
  const renderDialogContent = () => {
    if (typeof props.data.content === "string") {
      return <DialogContentText>{props.data.content}</DialogContentText>;
    }
    return props.data.content;
  };

  const handleButtonClick =
    (btn: DialogProps["primaryButton"] | DialogProps["secondaryButton"]) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!btn!.preventClosingDialog) {
        props.onClose();
      }
      if (btn!.onClick) {
        btn!.onClick(e);
      }
    };

  return (
    <MUIDialog
      open={props.isOpen}
      onClose={props.onClose}
      TransitionComponent={transitionWrapper(props.data.transition)}
      fullScreen={props.data.fullScreen}
      fullWidth
    >
      {(props.data.title || props.data.closable) && (
        <DialogTitle>
          <Grid container alignItems="center">
            <Grid item flexGrow={1}>
              <Typography variant="h6" role="heading">
                {props.data.title}
              </Typography>
            </Grid>
            {props.data.closable && (
              <Grid item>
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={props.onClose}
                  aria-label="Close Dialog"
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </DialogTitle>
      )}

      <DialogContent>
        <Box paddingTop={1}>{renderDialogContent()}</Box>
      </DialogContent>
      {(props.data.primaryButton || props.data.secondaryButton) && (
        <DialogActions>
          {props.data.secondaryButton && (
            <Button
              onClick={handleButtonClick(props.data.secondaryButton)}
              color={props.data.secondaryButton.color ?? "inherit"}
              size={props.data.secondaryButton.size ?? "large"}
            >
              {props.data.secondaryButton.label}
            </Button>
          )}
          {props.data.primaryButton && (
            <Button
              onClick={handleButtonClick(props.data.primaryButton)}
              color={props.data.primaryButton.color ?? "primary"}
              size={props.data.primaryButton.size ?? "large"}
            >
              {props.data.primaryButton.label}
            </Button>
          )}
        </DialogActions>
      )}
    </MUIDialog>
  );
};

export default Dialog;
