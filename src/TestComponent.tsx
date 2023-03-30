import React from "react";

import { PeripheralsContext } from "./Peripherals/Peripherals";

const TestComponent: React.FC = (props) => {
  const peripherals = React.useContext(PeripheralsContext);

  const openDialog = () => {
    const openNestedDialog = () =>
      peripherals.dialog.open({
        title: "A Nested Dialog Title",
        content: (
          <>
            <div>This is some content for testing!</div>
            <div>
              <button onClick={() => peripherals.dialog.close()}>close</button>
            </div>
          </>
        ),
      });

    peripherals.dialog.open({
      title: "A Dialog Title",
      content: (
        <>
          <div>This is some content for testing!</div>
          <div>
            <button onClick={() => peripherals.dialog.close()}>close</button>
          </div>
          <div>
            <button onClick={openNestedDialog}>Open another dialog</button>
          </div>
        </>
      ),
    });
  };

  const openDrawer = () => {
    peripherals.drawer.open({
      title: "Hej",
      content: "Där!",
    });
  };

  return (
    <>
      <button onClick={openDialog}>open dialog</button>
      <button onClick={openDrawer}>open drawer</button>
      <button
        onClick={() =>
          peripherals.notification.open({
            title: "Closable",
            message: "This is a notification",
            type: "info",
            closable: true,
          })
        }
      >
        open closable notification
      </button>
      <button
        onClick={() =>
          peripherals.notification.open({
            title: "Auto Closing",
            message: "This is a notification",
            type: "info",
            closeAfter: 3000,
          })
        }
      >
        open auto-closing notification
      </button>
      <button
        onClick={() =>
          peripherals.loading.open({
            message: "Loading Resources...",
            closeAfter: 3000,
          })
        }
      >
        open loading
      </button>
    </>
  );
};

export default TestComponent;
