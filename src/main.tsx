import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadRuntimeConfig } from "./lib/config";

loadRuntimeConfig().then(() => {
  createRoot(document.getElementById("root")!).render(
    <App />
  );
}).catch((error) => {
  console.error("Failed to load runtime configuration:", error);
  // Still render the app, but log the error
  // Configuration will fall back to build-time env vars
  createRoot(document.getElementById("root")!).render(
    <App />
  );
});
