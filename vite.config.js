import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "./assets/*", dest: "assets" },
        {
          src: "./public/assets/{*,}",
          dest: "public/assets", // no need to hardcode dist here
        },
      ],
      silent: true,
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,   // disable unless debugging
    minify: "esbuild",  // fast minification
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  resolve: {},
  base: "/", // important for custom domain hosting at root
});
