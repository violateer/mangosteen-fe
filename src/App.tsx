import { defineComponent, ref } from "vue";
import "./App.scss";
import { RouterView } from "vue-router";

export const App = defineComponent({
  setup() {
    return () => (
      <div class="app">
        <RouterView />
      </div>
    );
  },
});
