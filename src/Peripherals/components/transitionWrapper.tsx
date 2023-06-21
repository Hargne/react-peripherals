// A helper component for Material UI's TransitionComponent prop.
import { Fade, Slide, Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { TransitionType } from "./transitionWrapper.types";

const SlideComponent = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const transitionWrapper = (type?: TransitionType) => {
  if (type === "fade") {
    return Fade;
  }
  if (type === "zoom") {
    return Zoom;
  }
  return SlideComponent;
};

export default transitionWrapper;
