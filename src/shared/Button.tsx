import { defineComponent, ref } from "vue";
import s from "./Button.module.scss";

interface ButtonProps {
  onClick: (e: MouseEvent) => void;
}

export const Button = defineComponent<ButtonProps>({
  setup(props, context) {
    return () => <button class={s.button}>{context.slots.default?.()}</button>;
  },
});
