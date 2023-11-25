import { defineComponent, ref } from "vue";
import s from "./WelcomeLayout.module.scss";
import { RouterLink } from "vue-router";

export const WelcomeLayout = defineComponent({
  setup(props, { slots }) {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          {slots.icon?.()}
          {slots.title?.()}
        </div>
        <div class={s.actions}>{slots.buttons?.()}</div>
      </div>
    );
  },
});