import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app.tsx";

import "./index.css";
import QueryClientProvider from "./providers/tanstack-query.providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
