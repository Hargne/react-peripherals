import React from "react";

import { PeripheralsContext } from "./Peripherals/Peripherals";

const TestComponent: React.FC = (props) => {
  const peripherals = React.useContext(PeripheralsContext);

  const openDialog = () => {
    peripherals.dialog.open({
      title: "Hej",
      content: "Där!",
    });
  };

  const openDrawer = () => {
    peripherals.drawer.open({
      title: "Hej",
      content: "Där!",
    });
  };

  const openNotification = () => {
    peripherals.notification.open({
      title: "Hej",
      message: "Something",
      type: "info",
    });
  };

  return (
    <>
      <button onClick={openDialog}>open dialog</button>
      <button onClick={openDrawer}>open drawer</button>
      <button onClick={openNotification}>open notification</button>
    </>
  );
};

export default TestComponent;
