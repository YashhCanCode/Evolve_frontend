import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:5050", // backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api") // correct path
      },
    },
    fs: {
      // ✅ allow Vite to serve node_modules and parent folders
      allow: [
        ".",             // project root
        "./node_modules" // node_modules inside root
      ],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));