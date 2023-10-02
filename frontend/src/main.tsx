import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";
import Providers from "./providers/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <CssBaseline />
      <App />
    </Providers>
  </React.StrictMode>
);
