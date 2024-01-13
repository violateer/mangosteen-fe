import { createApp } from "vue";
import { createRouter } from "vue-router";
import { routes } from "./config/routes";
import { history } from "./shared/history";
import "@svgstore";
import "vant/lib/index.css";
import { fetchMe, mePromise } from "./shared/me";

import { App } from "./App"; // 这行放最后，因为需要vars.scss的变量覆盖vant变量

const router = createRouter({ history, routes });

fetchMe();

router.beforeEach(async (to, from) => {
  if (
    to.path === "/" ||
    to.path === "/start" ||
    to.path.startsWith("/welcome") ||
    to.path.startsWith("/sign_in")
  ) {
    return true;
  } else {
    const path = await mePromise!.then(
      () => true,
      () => "/sign_in?return_to=" + to.path
    );
    return path;
  }
});

const app = createApp(App);
app.use(router);
app.mount("#app");
