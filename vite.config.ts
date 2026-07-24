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
    host: "::",
    port: 8080,
    strictPort: true,
  },
  preview: { host: "::", port: 8080 },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
