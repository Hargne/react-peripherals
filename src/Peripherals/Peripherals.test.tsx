import React from "react";
import {
  act,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import Peripherals, { PeripheralsContext } from "./Peripherals";

describe("Peripherals", () => {
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
          content: <div>Nested dialog content</div>,
        });

      return <button onClick={openDialog}>open dialog</button>;
    };

    it("should open a dialog and then close it", async () => {
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

    it("should open a nested dialog and then close it", async () => {
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
  });
});
