import React from "react";
import ReactDOM from "react-dom/client";
import { VisibilityProvider } from "./utilities/visibilityProvider";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <VisibilityProvider> */}
    <App />
    {/* </VisibilityProvider> */}
  </React.StrictMode>
);
