import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// @ts-nocheck
import { svgstore } from "./src/vite_plugins/svgstore";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    svgstore(),
  ],
});
