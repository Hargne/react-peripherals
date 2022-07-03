import React from "react";
import { Fade, Slide, Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

export type TransitionType = "slide" | "fade" | "zoom";

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
