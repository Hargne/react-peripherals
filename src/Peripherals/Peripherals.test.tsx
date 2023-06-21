import React from "react";
import {
  act,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import Peripherals, { PeripheralsContext } from "./Peripherals";
import { LoadingProps } from "./Peripherals.types";

describe("Peripherals", () => {
  it("should be able to render custom components", async () => {
    const CustomLoadingComponent: React.FC<{ data: LoadingProps }> = (
      props
    ) => <div>{props.data.message}</div>;
    const LoadingTestComponent = () => {
      const peripherals = React.useContext(PeripheralsContext);
      return (
        <button
          onClick={() =>
            peripherals.loading.open({
              message: "loading message",
            })
          }
        >
          open
        </button>
      );
    };
    const screen = render(
      <Peripherals components={{ loading: CustomLoadingComponent }}>
        <LoadingTestComponent />
      </Peripherals>
    );
    expect(() => screen.getByText(/loading message/i)).toThrow();
    await act(async () =>
      screen.getByRole("button", { name: /open/i }).click()
    );
    await waitFor(() =>
      expect(screen.getByText(/loading message/i)).toBeInTheDocument()
    );
  });

  describe("Dialog", () => {
    const DialogTestComponent = () => {
      const peripherals = React.useContext(PeripheralsContext);

      const openDialog = () =>
        peripherals.dialog.open({
          closable: true,
          title: "A Dialog Title",
          content: <div>Dialog content</div>,
          primaryButton: {
            label: "open nested dialog",
            onClick: openNestedDialog,
          },
        });

      const openNestedDialog = () =>
        peripherals.dialog.open({
          closable: true,
          title: "A Nested Dialog Title",
          content: "This content is a string, not a React component",
        });

      return <button onClick={openDialog}>open dialog</button>;
    };

    it("should be possible to open and then manually be closed", async () => {
      const screen = render(
        <Peripherals>
          <DialogTestComponent />
        </Peripherals>
      );
      expect(() => screen.getByText(/a dialog title/i)).toThrow();
      // Open the dialog
      await act(async () => screen.getByText(/open dialog/i).click());
      await waitFor(() =>
        expect(screen.getByText(/a dialog title/i)).toBeInTheDocument()
      );
      // Close the dialog
      await waitFor(() =>
        screen.getByRole("button", { name: /close dialog/i }).click()
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/a dialog title/i)
      );
    });

    it("should be possible to open a nested dialog and then close it", async () => {
      const screen = render(
        <Peripherals>
          <DialogTestComponent />
        </Peripherals>
      );

      expect(() => screen.getByText(/a dialog title/i)).toThrow();
      // Open the first dialog
      await act(async () => screen.getByText(/open dialog/i).click());
      await waitFor(() =>
        expect(screen.getByText(/a dialog title/i)).toBeInTheDocument()
      );
      // Open the nested dialog
      expect(() => screen.getByText(/a nested dialog title/i)).toThrow();
      await act(async () => screen.getByText(/open nested dialog/i).click());
      await waitFor(() =>
        expect(screen.getByText(/a nested dialog title/i)).toBeInTheDocument()
      );
      // Close the nested dialog
      await waitFor(() =>
        screen.getByRole("button", { name: /close dialog/i }).click()
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/a nested dialog title/i)
      );
    });

    it("should open and auto-close after a given time period", async () => {
      const DialogAutoCloseTestComponent = () => {
        const peripherals = React.useContext(PeripheralsContext);

        return (
          <button
            onClick={() =>
              peripherals.dialog.open({
                closable: true,
                title: "An auto-close Dialog Title ",
                closeAfter: 100,
                content: <div>Dialog content</div>,
              })
            }
          >
            open dialog
          </button>
        );
      };

      const screen = render(
        <Peripherals>
          <DialogAutoCloseTestComponent />
        </Peripherals>
      );

      expect(() => screen.getByText(/an auto-close dialog title/i)).toThrow();
      // Open the dialog
      await act(async () => screen.getByText(/open dialog/i).click());
      await waitFor(() =>
        expect(
          screen.getByText(/an auto-close dialog title/i)
        ).toBeInTheDocument()
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/an auto-close dialog title/i)
      );
    });
  });

  describe("Drawer", () => {
    const DrawerTestComponent = () => {
      const peripherals = React.useContext(PeripheralsContext);

      return (
        <button
          onClick={() =>
            peripherals.drawer.open({
              title: "Drawer Title",
              content: <div>Drawer content</div>,
            })
          }
        >
          open drawer
        </button>
      );
    };

    it("should be possible to open a drawer and then close it", async () => {
      const screen = render(
        <Peripherals>
          <DrawerTestComponent />
        </Peripherals>
      );
      expect(() => screen.getByText(/drawer title/i)).toThrow();
      // Open the drawer
      await act(async () => screen.getByText(/open drawer/i).click());
      await waitFor(() =>
        expect(screen.getByText(/drawer title/i)).toBeInTheDocument()
      );
      // Close the drawer
      await waitFor(() =>
        screen.getByRole("button", { name: /close drawer/i }).click()
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/drawer title/i)
      );
    });

    it("should be possible to open nested drawers and then close both of them", async () => {
      const DrawerNestedTestComponent = () => {
        const peripherals = React.useContext(PeripheralsContext);
        const open = () =>
          peripherals.drawer.open({
            title: "First Drawer",
            content: <button onClick={openNested}>open nested drawer</button>,
          });
        const openNested = () =>
          peripherals.drawer.open({
            title: "Second Drawer",
            content: "Nested drawer content",
          });

        return <button onClick={open}>open drawer</button>;
      };

      const screen = render(
        <Peripherals>
          <DrawerNestedTestComponent />
        </Peripherals>
      );
      expect(() => screen.getByText(/first drawer/i)).toThrow();
      // Open the drawer
      await act(async () => screen.getByText(/open drawer/i).click());
      await waitFor(() =>
        expect(screen.getByText(/first drawer/i)).toBeInTheDocument()
      );
      // Open the nested drawer
      expect(() => screen.getByText(/second drawer/i)).toThrow();
      await act(async () => screen.getByText(/open nested drawer/i).click());
      await waitFor(() =>
        expect(screen.getByText(/second drawer/i)).toBeInTheDocument()
      );
      // Close the nested drawer
      await waitFor(() =>
        screen.getByRole("button", { name: /close drawer/i }).click()
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/second drawer/i)
      );
      // Close the first drawer
      await waitFor(() =>
        screen.getByRole("button", { name: /close drawer/i }).click()
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/first drawer/i)
      );
    });
  });

  describe("Notification", () => {
    const NotificationTestComponent = () => {
      const peripherals = React.useContext(PeripheralsContext);

      return (
        <>
          <button
            onClick={() =>
              peripherals.notification.open({
                title: "Closable Title",
                message: "Closable Message",
                type: "success",
                closable: true,
              })
            }
          >
            open closable
          </button>
          <button
            onClick={() =>
              peripherals.notification.open({
                title: "Auto Close Title",
                message: "Auto Close Message",
                type: "success",
                closeAfter: 100,
              })
            }
          >
            open auto closable
          </button>
        </>
      );
    };

    it("should be possible to open and close manually", async () => {
      const screen = render(
        <Peripherals>
          <NotificationTestComponent />
        </Peripherals>
      );
      expect(() => screen.getByText(/Closable Title/i)).toThrow();
      // Open the notification
      await act(async () => screen.getByText(/open closable/i).click());
      await waitFor(() =>
        expect(screen.getByText(/Closable Title/i)).toBeInTheDocument()
      );
      // Close the notification
      await waitFor(() =>
        screen.getByRole("button", { name: /close notification/i }).click()
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Closable Title/i)
      );
    });

    it("should open and auto-close after a given time period", async () => {
      const screen = render(
        <Peripherals>
          <NotificationTestComponent />
        </Peripherals>
      );

      expect(() => screen.getByText(/Auto Close  title/i)).toThrow();
      // Open the notification
      await act(async () => screen.getByText(/open auto closable/i).click());
      await waitFor(() =>
        expect(screen.getByText(/Auto Close title/i)).toBeInTheDocument()
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Auto Close title/i)
      );
    });
  });

  describe("Loading", () => {
    const LoadingTestComponent = () => {
      const peripherals = React.useContext(PeripheralsContext);
      return (
        <>
          <button
            onClick={() =>
              peripherals.loading.open({
                message: "loading message",
              })
            }
          >
            open
          </button>
          <button onClick={() => peripherals.loading.close()}>close</button>
        </>
      );
    };

    it("should be possible to open and close", async () => {
      const screen = render(
        <Peripherals>
          <LoadingTestComponent />
        </Peripherals>
      );
      expect(() => screen.getByText(/loading message/i)).toThrow();
      await act(async () =>
        screen.getByRole("button", { name: /open/i }).click()
      );
      await waitFor(() =>
        expect(screen.getByText(/loading message/i)).toBeInTheDocument()
      );
      await act(async () =>
        screen.getByRole("button", { name: /close/i }).click()
      );
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/loading message/i)
      );
    });
  });
});
