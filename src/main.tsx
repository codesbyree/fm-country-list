import { createRoot } from "react-dom/client";

import App from "./app.tsx";

import "./index.css";
import QueryClientProvider from "./providers/tanstack-query.providers.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider>
    <App />
  </QueryClientProvider>,
);
