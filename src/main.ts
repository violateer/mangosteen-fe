import { createApp } from "vue";
import { createRouter } from "vue-router";
import { routes } from "./config/routes";
import { history } from "./shared/history";
import "@svgstore";
import "vant/lib/index.css";
import { App } from "./App"; // 这行放最后，因为需要vars.scss的变量覆盖vant变量

const router = createRouter({ history, routes });

const app = createApp(App);
app.use(router);
app.mount("#app");
