import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import { vercel } from "vite-plugin-vercel/vite";

export default defineConfig({
  plugins: [vercel(), vike(), tailwindcss(), vue()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
