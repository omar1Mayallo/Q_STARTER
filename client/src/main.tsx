import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n/config.ts";
import QueryProvider from "./providers/QueryProvider.tsx";
import NotifyProvider from "./providers/NotifyProvider.tsx";
import ThemeProvider from "./providers/ThemeProvider/index.tsx";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "@fontsource/cairo/300.css"; // Light
import "@fontsource/cairo/400.css"; // Regular
import "@fontsource/cairo/500.css"; // Medium
import "@fontsource/cairo/700.css"; // Bold
import "react-photo-view/dist/react-photo-view.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <NotifyProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotifyProvider>
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
