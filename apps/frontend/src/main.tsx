import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./styles/index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./components/ThemeProvider.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
