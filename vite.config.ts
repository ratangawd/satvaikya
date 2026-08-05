import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// Plain Vite SPA: React + Tailwind v4 + react-router-dom.
// `npm run build` outputs a static `dist/` for Hostinger shared hosting.
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: true,
  },
  preview: { host: "0.0.0.0", port: 5000 },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
