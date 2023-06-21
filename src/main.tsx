import React from "react";
import ReactDOM from "react-dom/client";
import KitchenSink from "./KitchenSink";
import Peripherals from "./Peripherals/Peripherals";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Peripherals>
      <KitchenSink />
    </Peripherals>
  </React.StrictMode>
);
