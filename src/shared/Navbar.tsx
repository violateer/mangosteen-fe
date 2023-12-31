import { PropType, defineComponent, ref } from "vue";
import s from "./Navbar.module.scss";

export const Navbar = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class={s.navbar}>
        <span class={s.icon_wrapper}>{slots.icon?.()}</span>
        <span class={s.title_wrapper}>{slots.default?.()}</span>
      </div>
    );
  },
});
