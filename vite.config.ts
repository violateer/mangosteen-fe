import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";

// @ts-nocheck
import { svgstore } from "./src/vite_plugins/svgstore";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api/v1": {
        target: "http://www.violateer.top:3300/",
      },
    },
  },
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    svgstore(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
});
