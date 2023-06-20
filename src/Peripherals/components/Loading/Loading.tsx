import {
  alpha,
  Backdrop,
  Box,
  CircularProgress,
  colors,
  Typography,
} from "@mui/material";
import React from "react";

import { LoadingProps } from "./Loading.types";

const Loading: React.FC<{
  data?: LoadingProps;
  onClose: () => void;
  isOpen: boolean;
}> = (props) => (
  <Backdrop
    open={props.isOpen}
    transitionDuration={500}
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      color: colors.common.black,
      background: alpha(colors.common.white, 0.85),
      flexDirection: "column",
      opacity: 0.85,
    }}
  >
    <CircularProgress size={64} color="inherit" />
    {props.data?.message && (
      <Box position="absolute" top="58%" textAlign="center">
        <Typography variant="overline">{props.data?.message}</Typography>
      </Box>
    )}
  </Backdrop>
);

export default Loading;
