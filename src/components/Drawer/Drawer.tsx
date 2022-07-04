import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Box,
  colors,
  Drawer as MUIDrawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { DrawerProps } from "./Drawer.types";

const Drawer: React.FC<{
  data: DrawerProps;
  isOpen: boolean;
  onClose: (id: DrawerProps["id"]) => void;
}> = (props) => {
  return (
    <MUIDrawer
      anchor={props.data.anchor || "left"}
      PaperProps={{
        style: { maxWidth: props.data.width || "40rem", width: "100%" },
      }}
      open={props.isOpen}
      onClose={() => props.onClose(props.data.id)}
    >
      {props.data.title && (
        <AppBar
          position="sticky"
          sx={{ zIndex: 1500, backgroundColor: colors.common.white }}
          elevation={0}
        >
          <Grid container spacing={1} sx={{ p: 2 }} alignItems="center">
            <Grid item flexGrow={1}>
              <Typography color="textPrimary" variant="h5" role="heading">
                {props.data.title}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="Close Drawer"
                size="small"
                onClick={() => props.onClose(props.data.id)}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </AppBar>
      )}
      <Box
        flex={1}
        paddingX={3}
        paddingTop={1}
        paddingBottom={3}
        sx={{
          backgroundColor: props.data.contentBackgroundColor || "inherit",
        }}
      >
        {props.data.content}
      </Box>
    </MUIDrawer>
  );
};

export default Drawer;
